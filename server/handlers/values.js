"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResistorsItemHandler = exports.ResistorsHandler = void 0;
const helpers_js_1 = require("./helpers.js");
const ResistorsHandler = (db) => async (request, response) => {
    switch (request.method?.toLowerCase()) {
        case 'get':
            {
                getAllResistors(db)
                    .then(items => (0, helpers_js_1.writeResponse)(response, items, 200))
                    .catch((error) => (0, helpers_js_1.writeResponse)(response, error, 500))
                    .finally(() => { });
            }
            ;
            break;
        default: {
            (0, helpers_js_1.writeResponse)(response, null, 405);
        }
    }
};
exports.ResistorsHandler = ResistorsHandler;
const ResistorsItemHandler = (db) => async (request, response) => {
    const id = request.url?.split('/').pop();
    const body = await (0, helpers_js_1.processHttpBody)(request);
    switch (request.method?.toLowerCase()) {
        case 'patch':
            {
                updateResistor(db, id, body).then(result => (0, helpers_js_1.writeResponse)(response, result, 200))
                    .catch(error => (0, helpers_js_1.writeResponse)(response, error, 500))
                    .finally(() => { });
            }
            ;
            break;
        default: {
            (0, helpers_js_1.writeResponse)(response, null, 405);
        }
    }
};
exports.ResistorsItemHandler = ResistorsItemHandler;
function getAllResistors(db) {
    return new Promise((resolve, reject) => {
        db.all('select * from resistors order by value', [], (error, rows) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
}
function updateResistor(db, id, data) {
    const allowedKeys = ['text', 'value', 'active'];
    const keys = Object.keys(data).filter(key => allowedKeys.includes(key));
    const statement = keys.map(key => `${key} = ?`);
    const values = keys.map(key => data[key]);
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`UPDATE resistors set ${statement.join(', ')} where id = ?`);
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
