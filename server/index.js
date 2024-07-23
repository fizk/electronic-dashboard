"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const sqlite3_1 = require("sqlite3");
const wantlist_js_1 = require("./handlers/wantlist.js");
const values_js_1 = require("./handlers/values.js");
const skeleton_js_1 = require("./handlers/skeleton.js");
const PORT = 3030;
const db = new sqlite3_1.Database('./database.db');
const router = [
    [/^\/$/, skeleton_js_1.SkeletonHandler],
    [/\.js$/, skeleton_js_1.JsHandler],
    [/\.ico$/, skeleton_js_1.NotFoundHandler],
    [/\.css$/, skeleton_js_1.CssHandler],
    [/^\/api\/wantlist$/, (0, wantlist_js_1.WantListHandler)(db)],
    [/^\/api\/wantlist\/[0-9]+$/, (0, wantlist_js_1.WantListItemHandler)(db)],
    [/^\/api\/values\/resistors$/, (0, values_js_1.ResistorsHandler)(db)],
    [/^\/api\/values\/resistors\/[0-9\.k]+$/, (0, values_js_1.ResistorsItemHandler)(db)],
];
const server = (0, http_1.createServer)(async (request, response) => {
    console.log(`${new Date().toISOString()} ${request.method} ${request.url}`);
    for (const element of router) {
        if (request.url?.match(element.at(0))) {
            element.at(1)(request, response);
            return;
        }
    }
    (0, skeleton_js_1.SkeletonHandler)(request, response);
});
server.listen(PORT, undefined, () => {
    console.log(`Server is running on port ${PORT}`);
    process.send && process.send('ready');
});
process.on('SIGINT', function () {
    db.close(error => {
        console.log(`${new Date().toISOString()} Database down`);
        process.exit(error ? 1 : 0);
    });
    server.closeAllConnections();
});
