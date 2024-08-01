import {Database, RunResult} from 'sqlite3';
import {writeResponse, processHttpBody} from './helpers.js';
import type {IncomingMessage, ServerResponse} from 'http';

interface ResistorItem {
    text: string
    value: number
    active: boolean
}

interface ResistorItemEntry extends ResistorItem {
    id: string | number,
}

interface CapacitorItem {
    nano: number
    nano_value: string
    pico: number
    pico_value: string
    micro: number
    micro_value: string
    farad: number
    farad_value: string
    active: boolean
}

interface CapacitorItemEntry extends CapacitorItem {
    id: string | number,
}

interface CapacitorValues {
    id: string
    nano: number
    nano_value: string
    pico: number
    pico_value: string
    micro: number
    micro_value: string
    farad: number
    farad_value: string
    electrolytic: number | null
    ceramic: number | null
    film: number | null
}

export const CapacitorType = {
    Electrolytic: 'capacitorsElectrolytic',
    Ceramic: 'capacitorsCeramic',
    Film: 'capacitorsFilm'
}

export const ResistorsHandler = (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    switch (request.method?.toLowerCase()) {
        case 'get': {
            getAllResistors(db)
                .then(items => writeResponse(response, items, 200))
                .catch((error: Error) => writeResponse(response, error, 500))
                .finally(() => {});
        }; break;
        default: {
            writeResponse(response, null, 405);
        }
    } 
};

export const ResistorsItemHandler = (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    const id: string = request.url?.split('/').pop() as string;
    const body = await processHttpBody<ResistorItemEntry>(request);
    
    switch (request.method?.toLowerCase()) {
        case 'patch': {
            updateResistor(db, id, body).then(result => writeResponse(response, result, 200))
                .catch(error => writeResponse(response, error, 500))
                .finally(() => {})
        }; break;
        default: {
            writeResponse(response, null, 405);   
        }
    }
};

export const CapacitorsHandler = (type: string) => (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    switch (request.method?.toLowerCase()) {
        case 'get': {
            getAllCapacitors(db, type)
                .then(items => writeResponse(response, items, 200))
                .catch((error: Error) => writeResponse(response, error, 500))
                .finally(() => {});
        }; break;
        default: {
            writeResponse(response, null, 405);
        }
    } 
};

export const CapacitorsItemHandler = (type: string) => (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    const id: string = request.url?.split('/').pop() as string;
    const body = await processHttpBody<ResistorItemEntry>(request);
    
    switch (request.method?.toLowerCase()) {
        case 'patch': {
            updateCapacitor(db, type, id, body).then(result => writeResponse(response, result, 200))
                .catch(error => writeResponse(response, error, 500))
                .finally(() => {})
        }; break;
        default: {
            writeResponse(response, null, 405);   
        }
    }
};

export const CapacitorsValueHandler = (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    getCapacitorsActive(db)
        .then(result => writeResponse(response, result, 200))
        .catch(error => writeResponse(response, error, 500))
        .finally(() => {})
}

function getAllResistors(db: Database): Promise<ResistorItemEntry[]> {
    return new Promise((resolve, reject) => {
        db.all('select * from resistors order by value', [], (error: any, rows: ResistorItemEntry[]) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}

function updateResistor(db: Database, id: string, data: Partial<ResistorItem>): Promise<any> {
    const allowedKeys = ['text', 'value', 'active'];
    const keys = Object.keys(data).filter(key => allowedKeys.includes(key))
    const statement = keys.map(key => `${key} = ?`);
    const values = keys.map(key => (data as any)[key]);
    
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`UPDATE resistors set ${statement.join(', ')} where id = ?`);
        stmt.run([...values, id], function (error: Error)  {
            // @ts-ignore
            if (error || (this as RunResult).changes !== 1) {
                reject(error);
                return;
            }
            resolve((this as RunResult));
        });
        stmt.finalize();
    });
}

function getAllCapacitors(db: Database, type: string): Promise<CapacitorItemEntry[]> {
    return new Promise((resolve, reject) => {
        db.all(`select * from ${type} order by nano`, [], (error: any, rows: CapacitorItemEntry[]) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}

function getCapacitorsActive(db: Database): Promise<CapacitorValues[]> {
    return new Promise((resolve, reject) => {
        db.all(`
            select A.id, 
                A.nano,
                A.nano_value,
                A.pico,
                A.pico_value,
                A.micro,
                A.micro_value,
                A.farad,
                A.farad_value,

                CE.active as electrolytic, 
                CC.active as ceramic, 
                CF.active as film 
                from (
                    select * from capacitorsElectrolytic
                    union
                    select * from capacitorsCeramic
                    union 
                    select * from capacitorsFilm
                ) as A
            left join capacitorsElectrolytic as CE on (A.id = CE.id)
            left join capacitorsCeramic as CC on (A.id = CC.id)
            left join capacitorsFilm as CF on (A.id = CF.id)
            order by A.nano
            `, [], (error: any, rows: CapacitorValues[]) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}

function updateCapacitor (db: Database, type: string, id: string, data: Partial<CapacitorItem>): Promise<any> {
    const allowedKeys = ['nano', 'nano_value', 'pico', 'pico_value', 'micro', 'micro_value', 'farad', 'farad_value', 'active'];
    const keys = Object.keys(data).filter(key => allowedKeys.includes(key))
    const statement = keys.map(key => `${key} = ?`);
    const values = keys.map(key => (data as any)[key]);

    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`UPDATE ${type} set ${statement.join(', ')} where id = ?`);
        stmt.run([...values, id], function (error: Error)  {
            // @ts-ignore
            if (error || (this as RunResult).changes !== 1) {
                reject(error);
                return;
            }
            resolve((this as RunResult));
        });
        stmt.finalize();
    });
}

