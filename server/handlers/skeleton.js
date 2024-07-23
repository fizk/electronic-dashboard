"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssHandler = exports.JsHandler = exports.NotFoundHandler = exports.SkeletonHandler = void 0;
const promises_1 = require("fs/promises");
const SkeletonHandler = (request, response) => {
    const skeleton = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>My app</title>
            <script src="/app.js" defer></script>
            <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;400&display=swap" rel="stylesheet">
            <link href="/app.css" rel="stylesheet">
        </head>
        <body>
            <div data-react></div>
        </body>
        </html> 
    `;
    response.writeHead(200, {
        'Content-Length': Buffer.byteLength(skeleton),
        'Content-Type': 'text/html',
    }).end(skeleton);
};
exports.SkeletonHandler = SkeletonHandler;
const NotFoundHandler = (request, response) => {
    response.writeHead(404, {
        'Content-Length': 0,
        'Content-Type': 'text/html',
    }).end();
};
exports.NotFoundHandler = NotFoundHandler;
const JsHandler = async (request, response) => {
    const file = await (0, promises_1.readFile)(`./client${request.url}`);
    response.writeHead(200, {
        'content-type': 'application/javascript'
    }).end(file);
};
exports.JsHandler = JsHandler;
const CssHandler = async (request, response) => {
    const file = await (0, promises_1.readFile)(`./client${request.url}`);
    response.writeHead(200, {
        'content-type': 'text/css'
    }).end(file);
};
exports.CssHandler = CssHandler;
