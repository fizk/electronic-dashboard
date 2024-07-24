import {IncomingMessage, ServerResponse} from 'http';
import {readFile} from 'fs/promises'

export const SkeletonHandler = (request: IncomingMessage, response: ServerResponse) => {
    const skeleton = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>My app</title>
            <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;400&display=swap" rel="stylesheet">
            <script src="/electronic/app.js" defer></script>
            <link href="/electronic/app.css" rel="stylesheet">
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
}

export const NotFoundHandler = (request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(404, {
        'Content-Length': 0,
        'Content-Type': 'text/html',
    }).end();
}

export const JsHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const path = request.url?.split('/').filter(part => part !== '').slice(1).join('/');
    try {
        const file = await readFile(`./client/${path}`);
        response.writeHead(200, {
            'content-type': 'application/javascript'
        }).end(file);
    } catch(error) {
        response.writeHead(404, {
            'content-type': 'application/javascript'
        }).end();
    }
}

export const CssHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const path = request.url?.split('/').filter(part => part !== '').slice(1).join('/');
    try {
        const file = await readFile(`./client/${path}`);
        response.writeHead(200, {
            'content-type': 'text/css'
        }).end(file);
    } catch(error) {
        response.writeHead(404, {
            'content-type': 'application/javascript'
        }).end();
    }
}