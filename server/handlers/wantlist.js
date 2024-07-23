"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WantListItemHandler = exports.WantListHandler = void 0;
const helpers_js_1 = require("./helpers.js");
const WantListHandler = (db) => async (request, response) => {
    switch (request.method?.toLowerCase()) {
        case 'get':
            {
                getAll(db).then(items => {
                    (0, helpers_js_1.writeResponse)(response, items, 200);
                }).catch((error) => {
                    (0, helpers_js_1.writeResponse)(response, error, 500);
                }).finally(() => { });
            }
            ;
            break;
        case 'post':
            {
                const data = await (0, helpers_js_1.processHttpBody)(request);
                if (!data['name']) {
                    (0, helpers_js_1.writeResponse)(response, { message: 'Missing value for "name"' }, 401);
                    return;
                }
                const payload = {
                    name: (Array.isArray(data['name']) ? data['name'].at(0) : data['name']) || '',
                    done: (Array.isArray(data['done']) ? Number(data['name'].at(0)) : Number(data['done'])) || 0,
                    date: new Date().getTime(),
                    description: (Array.isArray(data['description']) ? data['description'].at(0) : data['description']) || null,
                };
                createItem(db, payload).then(item => {
                    (0, helpers_js_1.writeResponse)(response, item, 201);
                }).catch((error) => {
                    (0, helpers_js_1.writeResponse)(response, error, 500);
                }).finally(() => { });
            }
            ;
            break;
        default: {
            (0, helpers_js_1.writeResponse)(response, null, 405);
        }
    }
};
exports.WantListHandler = WantListHandler;
const WantListItemHandler = (db) => async (request, response) => {
    const id = request.url?.split('/').pop();
    switch (request.method?.toLowerCase()) {
        case 'get':
            {
                getItem(db, id).then(item => {
                    if (item) {
                        (0, helpers_js_1.writeResponse)(response, item, 200);
                    }
                    else {
                        (0, helpers_js_1.writeResponse)(response, null, 404);
                    }
                }).catch((error) => {
                    (0, helpers_js_1.writeResponse)(response, error, 500);
                }).finally(() => { });
            }
            ;
            break;
        case 'patch':
            {
                const data = await (0, helpers_js_1.processHttpBody)(request);
                updateItem(db, id, data).then(result => {
                    (0, helpers_js_1.writeResponse)(response, result, 200);
                }).catch((error) => {
                    (0, helpers_js_1.writeResponse)(response, error, 500);
                }).finally(() => { });
            }
            ;
            break;
        case 'put':
            {
                const data = await (0, helpers_js_1.processHttpBody)(request);
                if (!data['name']) {
                    (0, helpers_js_1.writeResponse)(response, { message: 'Missing value for "name"' }, 405);
                    return;
                }
                const payload = {
                    name: (Array.isArray(data['name']) ? data['name'].at(0) : data['name']) || '',
                    done: (Array.isArray(data['done']) ? Number(data['name'].at(0)) : Number(data['done'])) || 0,
                    description: (Array.isArray(data['description']) ? data['description'].at(0) : data['description']) || null,
                };
                updateItem(db, id, payload).then(result => {
                    (0, helpers_js_1.writeResponse)(response, result, 200);
                }).catch((error) => {
                    (0, helpers_js_1.writeResponse)(response, error, 500);
                }).finally(() => { });
            }
            ;
            break;
        case 'delete':
            {
                deleteItem(db, id).then(result => {
                    (0, helpers_js_1.writeResponse)(response, result, 200);
                }).catch((error) => {
                    (0, helpers_js_1.writeResponse)(response, error, 500);
                }).finally(() => { });
            }
            ;
            break;
        default: {
            (0, helpers_js_1.writeResponse)(response, null, 405);
        }
    }
};
exports.WantListItemHandler = WantListItemHandler;
function getAll(db) {
    return new Promise((resolve, reject) => {
        db.all('select * from wantlist', [], (error, rows) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}
function getItem(db, id) {
    return new Promise((resolve, reject) => {
        db.get('select * from wantlist where id = $id', { $id: id }, (error, row) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(row);
            }
        });
    });
}
function createItem(db, data) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO wantlist (name, description, done, date) VALUES (?, ?, ?, ?)");
        stmt.run([data.name, data.description, Number(data.done), data.date], function (error) {
            // @ts-ignore
            if (error || this.changes !== 1) {
                reject(error);
                return;
            }
            resolve(this);
        });
        stmt.finalize();
    });
}
function updateItem(db, id, data) {
    const allowedKeys = ['name', 'description', 'done', 'date'];
    const keys = Object.keys(data).filter(key => allowedKeys.includes(key));
    const statement = keys.map(key => `${key} = ?`);
    const values = keys.map(key => data[key]);
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`UPDATE wantlist set ${statement.join(', ')} where id = ?`);
        stmt.run([...values, id], function (error) {
            // @ts-ignore
            if (error || this.changes !== 1) {
                reject(error);
                return;
            }
            resolve(this);
        });
        stmt.finalize();
    });
}
function deleteItem(db, id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("DELETE FROM wantlist WHERE id = ?");
        stmt.run([id], function (error) {
            // @ts-ignore
            if (error || this.changes !== 1) {
                reject(error);
                return;
            }
            resolve(this);
        });
        stmt.finalize();
    });
}
