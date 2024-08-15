import { writeResponse, writeUnauthorizedResponse } from '../helpers/response';
import { processHttpBody, Maybe } from '../helpers/processHttpBody';
import authorization from '../helpers/authorization.js';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Database, RunResult } from 'sqlite3';

interface WantListItem {
    name: string
    description?: Maybe<string>
    done: number
    date?: number
}

interface WantListEntry extends WantListItem {
    id: string | number,
}

export const WantListHandler = (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    switch (request.method?.toLowerCase()) {
        case 'get': {
            getAll(db).then(items => {
                writeResponse(response, items, 200);
            }).catch((error: Error) => {
                writeResponse(response, error, 500);
            }).finally(() => {});
        }; break;
        case 'post': {
            try {
                await authorization(request.headers.authorization);
                const data = await processHttpBody<WantListItem>(request);
                
                if (!data['name']) {
                    writeResponse(response, {message: 'Missing value for "name"'}, 401);
                    return;
                }
    
                const payload: WantListItem = {
                    name: (Array.isArray(data['name']) ? data['name'].at(0) : data['name']) || '',
                    done: (Array.isArray(data['done']) ? Number(data['name'].at(0)) : Number(data['done'])) || 0,
                    date: new Date().getTime(),
                    description: (Array.isArray(data['description']) ? data['description'].at(0) : data['description']) || null,
                };
    
                await createItem(db, payload).then(item => {
                    writeResponse(response, item, 201);
                }).catch((error: Error) => {
                    writeResponse(response, error, 500);
                }).finally(() => {});
            } catch (e) {
                writeUnauthorizedResponse(response);
            }
        }; break;
        default: {
            writeResponse(response, null, 405);
        }
    } 
}

export const WantListItemHandler = (db: Database) => async (request: IncomingMessage, response: ServerResponse) => {
    const id: string = request.url?.split('/').pop() as string;
    switch (request.method?.toLowerCase()) {
        case 'get': {
            getItem(db, id).then(item => {
                if (item) {
                    writeResponse(response, item, 200);
                } else {
                    writeResponse(response, null, 404);
                }
            }).catch((error: Error) => {
                writeResponse(response, error, 500);
            }).finally(() => {});
        }; break;
        case 'patch': {
            try {
                await authorization(request.headers.authorization);

                const data = await processHttpBody<WantListItem>(request);
                await updateItem(db, id, data as WantListItem).then(result => {
                    writeResponse(response, result, 200);
                }).catch((error: Error) => {
                    writeResponse(response, error, 500);
                }).finally(() => {});            
            } catch {
                writeUnauthorizedResponse(response);
            }
        }; break; 
        case 'put': {
            try {
                await authorization(request.headers.authorization);
                const data = await processHttpBody<WantListItem>(request);
                
                if (!data['name']) {
                    writeResponse(response, {message: 'Missing value for "name"'}, 405);
                    return;
                }
                const payload: WantListItem = {
                    name: (Array.isArray(data['name']) ? data['name'].at(0) : data['name']) || '',
                    done: (Array.isArray(data['done']) ? Number(data['name'].at(0)) : Number(data['done'])) || 0,
                    description: (Array.isArray(data['description']) ? data['description'].at(0) : data['description']) || null,
                };
                await updateItem(db, id, payload).then(result => {
                    writeResponse(response, result, 200);
                }).catch((error: Error) => {
                    writeResponse(response, error, 500);
                }).finally(() => {});
            } catch (e) {
                writeUnauthorizedResponse(response);
            }
        }; break;
        case 'delete': {
            try {
                await authorization(request.headers.authorization);
                deleteItem(db, id).then(result => {
                    writeResponse(response, result, 200);
                }).catch((error: Error) => {
                    writeResponse(response, error, 500);
                }).finally(() => {});
            } catch (e) {
                writeUnauthorizedResponse(response);
            }
        }; break;
        default: {
            writeResponse(response, null, 405);
        }
    }
}

function getAll(db: Database): Promise<WantListEntry[]> {
    return new Promise((resolve, reject) => {
        db.all('select * from WantList order by [date] asc', [], (error: any, rows: WantListEntry[]) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}

function getItem(db: Database, id: string): Promise<Maybe<WantListEntry>> {
    return new Promise((resolve, reject) => {
        db.get('select * from WantList where id = $id', {$id: id}, (error: any, row: WantListEntry) => {
            if (error) {
                reject(error);
            } else {
                resolve(row);
            }
        })
    });
}

function createItem(db: Database, data: WantListItem): Promise<RunResult> {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO WantList (name, description, done, date) VALUES (?, ?, ?, ?)");
        stmt.run([data.name, data.description, Number(data.done), data.date], function (error: Error)  {
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

function updateItem(db: Database, id: string, data: WantListItem): Promise<RunResult> {
    const allowedKeys = ['name', 'description', 'done', 'date'];
    const filteredData = Object.entries(data)
        .filter(([key]) => allowedKeys.includes(key))
        .map(filterRequestBody);

    const statement = filteredData.map(([key, value]) => `${key} = ?`)
    const values = filteredData.map(([key, value]) => value);

    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`UPDATE WantList set ${statement.join(', ')} where id = ?`);
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

function deleteItem(db: Database, id: string): Promise<RunResult> {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("DELETE FROM WantList WHERE id = ?");
        stmt.run([id], function (error: Error)  {
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

function filterRequestBody([key, value]: [string, any]) {
    switch (key) {
        case 'description': {
            if (value === null || value === undefined || value === '') {
                return [key, null];
            } else {
                return [key, value];
            }
        }; break;
        default: {
            return [key, value]
        }; break;
    }
}
