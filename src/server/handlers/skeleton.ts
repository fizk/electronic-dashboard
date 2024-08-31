import {IncomingMessage, ServerResponse} from 'http';
import {readFile} from 'fs/promises';

export const SkeletonHandler = async (request: IncomingMessage, response: ServerResponse) => {
    try {
        const file = await readFile(`./client/index.html`);
        response.writeHead(200, {
            'Content-Length': Buffer.byteLength(file),
            'content-type': 'text/html'
        }).end(file);
    } catch(error) {
        response.writeHead(404, {
            'Content-Length': 0,
            'content-type': 'text/html'
        }).end();
    }
}

export const NotFoundHandler = (request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(404, {
        'Content-Length': 0,
        'Content-Type': 'text/html',
    }).end();
}

export const JsHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(request.url!, 'http://any-host');
    const path = url.pathname?.split('/').filter(part => part !== '').slice(1).join('/');
    try {
        const file = await readFile(`./client/${path}`);
        response.writeHead(200, {
            'Content-Length': Buffer.byteLength(file),
            'content-type': 'application/javascript'
        }).end(file);
    } catch(error) {
        response.writeHead(404, {
            'Content-Length': 0,
            'content-type': 'application/javascript'
        }).end();
    }
}

export const CssHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(request.url!, 'http://any-host');
    const path = url.pathname?.split('/').filter(part => part !== '').slice(1).join('/');
    try {
        const file = await readFile(`./client/${path}`);
        response.writeHead(200, {
            'Content-Length': Buffer.byteLength(file),
            'content-type': 'text/css'
        }).end(file);
    } catch(error) {
        response.writeHead(404, {
            'Content-Length': 0,
            'content-type': 'application/javascript'
        }).end();
    }
}

export const ManifestHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const manifest = {
        name: 'Electronic Dashboard',
        short_name: 'ED',
        orientation: 'portrait',
        display: 'standalone',          // fullscreen, standalone, minimal-ui, browser
        background_color: '#dde7ea',    // member defines a placeholder background color for 
                                        //      the application page to display before its stylesheet is loaded.
        theme_color: '#dde7ea',         // The theme_color member is a string that defines the default 
                                        //      theme color for the application. This sometimes affects how the OS displays the site
        start_url: '/electronic',       // start_url member is a string that represents 
                                        //      the start URL of the web application — the preferred URL that should be 
                                        //      loaded when the user launches the web application
        icons: [                        //      icons must contain a 192px and a 512px icon
            {
                src: '/electronic/icons/512.png',
                type: 'image/png',
                sizes: '512x512',
            },
            {
                src: '/electronic/icons/192.png',
                type: 'image/png',
                sizes: '192x193',
            },
        ],
      };
    const manifestDocument = JSON.stringify(manifest, undefined, 4);
    
    response.writeHead(200, {
        'Content-Length': Buffer.byteLength(manifestDocument),
        'content-type': 'application/manifest+json'
    }).end(manifestDocument);

}

export const IconHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(request.url!, 'http://any-host');
    const path = url.pathname?.split('/').filter(part => part !== '');
    try {
        const file = await readFile(`./client/icons/${path.pop()}`);
        response.writeHead(200, {
            'Content-Length': Buffer.byteLength(file),
            'content-type': 'image/png'
        }).end(file);
    } catch (error) {
        response.writeHead(404, {
            'Content-Length': 0,
            'content-type': 'application/javascript'
        }).end();
    }
}

export const FontHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(request.url!, 'http://any-host');
    const path = url.pathname?.split('/').filter(part => part !== '');
    try {
        const file = await readFile(`./client/fonts/${path.pop()}`);
        response.writeHead(200, {
            'Content-Length': Buffer.byteLength(file),
            'content-type': 'font/otf'
        }).end(file);
    } catch (error) {
        response.writeHead(404, {
            'Content-Length': 0,
            'content-type': 'application/javascript'
        }).end();
    }
}
