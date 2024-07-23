import {Database, RunResult} from 'sqlite3';
import {writeResponse, processHttpBody} from './helpers.js';
import type {IncomingMessage, ServerResponse} from 'http';

interface ValueItem {
    text: string
    value: number
    active: boolean
}

interface ValueItemEntry extends ValueItem {
    id: string | number,
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
    const body = await processHttpBody<ValueItemEntry>(request);
    
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

function getAllResistors(db: Database): Promise<ValueItemEntry[]> {
    return new Promise((resolve, reject) => {
        db.all('select * from resistors order by value', [], (error: any, rows: ValueItemEntry[]) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}

function updateResistor(db: Database, id: string, data: Partial<ValueItem>): Promise<any> {
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
