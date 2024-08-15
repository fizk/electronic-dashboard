import { createServer } from 'http';
import { Database } from 'sqlite3';
import { 
    ResistorsHandler, 
    ResistorsItemHandler, 
    CapacitorsHandler, 
    CapacitorsItemHandler, 
    CapacitorsValueHandler, 
    CapacitorType, 
    ResistorType 
} from './handlers/values.js';
import { WantListHandler, WantListItemHandler } from './handlers/wantlist.js';
import { SkeletonHandler, NotFoundHandler, JsHandler, CssHandler, ManifestHandler, IconHandler } from './handlers/skeleton.js';
import type { IncomingMessage, ServerResponse } from 'http';

type Handler = (request: IncomingMessage, response: ServerResponse) => void;

const PORT = 3030;
const db = new Database('./database.db');

const router: [RegExp, Handler][] = [
    [/^\/$/,                                                            SkeletonHandler],
    [/\.ico$/,                                                          NotFoundHandler],
    [/^\/electronic\/manifest.json$/,                                   ManifestHandler],
    [/^\/electronic\/.*\.js(\?.*)*$/,                                   JsHandler],
    [/^\/electronic\/.*\.css(\?.*)*$/,                                  CssHandler],

    [/^\/electronic\/icons\/.*\.png(\?.*)*$/,                           IconHandler],
    
    [/^\/electronic\/api\/wantlist$/,                                   WantListHandler(db)],
    [/^\/electronic\/api\/wantlist\/[0-9]+$/,                           WantListItemHandler(db)],

    [/^\/electronic\/api\/values\/resistors\/fixed$/,                   ResistorsHandler(ResistorType.Fixed)(db)],
    [/^\/electronic\/api\/values\/resistors\/fixed\/[0-9\.k]+$/,        ResistorsItemHandler(ResistorType.Fixed)(db)],
    [/^\/electronic\/api\/values\/resistors\/variable$/,                ResistorsHandler(ResistorType.Variable)(db)],
    [/^\/electronic\/api\/values\/resistors\/variable\/[0-9\.k]+$/,     ResistorsItemHandler(ResistorType.Variable)(db)],
    [/^\/electronic\/api\/values\/resistors\/trim$/,                    ResistorsHandler(ResistorType.Trim)(db)],
    [/^\/electronic\/api\/values\/resistors\/trim\/[0-9\.k]+$/,         ResistorsItemHandler(ResistorType.Trim)(db)],

    [/^\/electronic\/api\/values\/capacitors$/,                         CapacitorsValueHandler(db)],

    [/^\/electronic\/api\/values\/capacitors\/electrolytic$/,           CapacitorsHandler(CapacitorType.Electrolytic)(db)],
    [/^\/electronic\/api\/values\/capacitors\/electrolytic\/[0-9\.]+$/, CapacitorsItemHandler(CapacitorType.Electrolytic)(db)],

    [/^\/electronic\/api\/values\/capacitors\/ceramic$/,                CapacitorsHandler(CapacitorType.Ceramic)(db)],
    [/^\/electronic\/api\/values\/capacitors\/ceramic\/[0-9\.]+$/,      CapacitorsItemHandler(CapacitorType.Ceramic)(db)],

    [/^\/electronic\/api\/values\/capacitors\/film$/,                   CapacitorsHandler(CapacitorType.Film)(db)],
    [/^\/electronic\/api\/values\/capacitors\/film\/[0-9\.]+$/,         CapacitorsItemHandler(CapacitorType.Film)(db)],
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
