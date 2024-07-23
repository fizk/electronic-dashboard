import { createServer } from 'http';
import { Database } from 'sqlite3';
import { WantListHandler, WantListItemHandler } from './handlers/wantlist.js';
import { ResistorsHandler, ResistorsItemHandler } from './handlers/values.js';
import { SkeletonHandler, NotFoundHandler, JsHandler, CssHandler } from './handlers/skeleton.js';
import type { IncomingMessage, ServerResponse } from 'http';

type Handler = (request: IncomingMessage, response: ServerResponse) => void;

const PORT = 3030;
const db = new Database('./database.db');

const router: [RegExp, Handler][] = [
    [/^\/$/,                        SkeletonHandler],
    [/\.js$/,                       JsHandler],
    [/\.ico$/,                      NotFoundHandler],
    [/\.css$/,                      CssHandler],
    [/^\/api\/wantlist$/,           WantListHandler(db)],
    [/^\/api\/wantlist\/[0-9]+$/,   WantListItemHandler(db)],
    [/^\/api\/values\/resistors$/,  ResistorsHandler(db)],
    [/^\/api\/values\/resistors\/[0-9\.k]+$/,  ResistorsItemHandler(db)],
]

const server = createServer(async (request, response) => {
    console.log(`${new Date().toISOString()} ${request.method} ${request.url}`);
    for (const element of router) {
        if (request.url?.match(element.at(0) as RegExp)) {
            (element.at(1) as Handler)(request, response);
            return;
        }
    }
    SkeletonHandler(request, response);

});
server.listen(PORT, undefined, () => {
    console.log(`Server is running on port ${PORT}`);
    process.send && process.send('ready');
});

process.on('SIGINT', function() {
    db.close(error => {
        console.log(`${new Date().toISOString()} Database down`);
        process.exit(error ? 1 : 0)
    });
    server.closeAllConnections();
});