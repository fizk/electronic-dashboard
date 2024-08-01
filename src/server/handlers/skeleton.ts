import {IncomingMessage, ServerResponse} from 'http';
import {readFile} from 'fs/promises'

export const SkeletonHandler = (request: IncomingMessage, response: ServerResponse) => {
    const skeleton = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <title>My app</title>
            <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;400&display=swap" rel="stylesheet">
            <script src="/electronic/app.js" defer></script>
            <link href="/electronic/app.css" rel="stylesheet">
            <style>
                html, body {
                    box-sizing: border-box;
                }

                *, *::before, *::after {
                    box-sizing: inherit;
                }

                body {
                    font-family: 'Spartan', sans-serif;
                    line-height: 1.5;
                    margin: 0;
                    color: var(--color-text);
                    min-height: 100dvh;
                }

                :root {
                    --color-red-1: #EF9A9A;
                    --color-pink-1: #F48FB1;
                    --color-purple-1: #CE93D8;
                    --color-purple-2: #B39DDB;
                    --color-indigo-1: #9FA8DA;
                    --color-blue-1: #90CAF9;
                    --color-blue-2: #81D4FA;
                    --color-cyan-1: #80DEEA;
                    --color-green-1: #80CBC4;
                    --color-green-2: #A5D6A7;
                    --color-green-3: #C5E1A5;
                    --color-lime-1: #E6EE9C;
                    --color-yellow-1: #FFF59D;
                    --color-orange-1: #FFE082;
                    --color-orange-2: #FFCC80;
                    --color-orange-3: #FFAB91;
                    --color-brown-1: #BCAAA4;
                    --color-gray-1: #CFD8DC;
                    --color-gray-2: #607D8B;
                    --color-gray-3: #263238;

                    --color-white: white;
                    --color-primary: #dde7ea;
                    --color-secondary: orange;
                    --color-text: rgb(30, 30, 30);

                    --size-max-width: 100%;
                    --space-0: 0.444rem;
                    --space-1: 0.66rem;
                    --space-2: 1rem;
                    --space-3: 1.5rem;
                    --space-4: 2.25rem;
                    --space-5: 5.063rem;
                    --font-0: 0.667rem;
                    --font-1: 1rem;
                    --font-2: 1.5rem;
                }

                [data-react] {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-template-rows: auto 1fr;
                    min-height: 100dvh;
                    
                }
                [data-splash-screen] {
                    grid-column: 1 / span 2;
                    display: flex;
                    background-color: var(--color-primary);
                    min-height: 100dvh;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                }

            </style>
        </head>
        <body>
            <div data-react>
                <div data-splash-screen>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 457.79 384.16" style="width: 50%">
                        <g id="Layer_3" data-name="Layer 3">
                            <ellipse cx="303.03" cy="348.96" rx="154.75" ry="30.56" fill="#d8d6d6"></ellipse>
                            <path d="M46,347.19S152,381.5,275,292.5s82.81-183.38,82.81-183.38l2.44-27.88L402.85,77l-2.44,35.39s85.25,240.21-30.45,296c-41.4,22.52-92.15,48.21-172.93,31.1C167,433,149.16,403.72,74,383.65c-5.19-1.39-53.58,1.07-53.58,1.07-.61-3-2.44-35.39-2.44-35.39S42.67,346.88,46,347.19Z" transform="translate(-12.21 -70.83)" fill="#fff"></path>
                            <path d="M72,357.19S178,391.5,301,302.5s82.81-183.38,82.81-183.38l2.44-27.88L428.85,87l-2.44,35.39s85.25,240.21-30.45,296c-41.4,22.52-92.15,48.21-172.93,31.1C193,443,175.16,413.72,100,393.65c-5.19-1.39-53.58,1.07-53.58,1.07-.61-3-2.44-35.39-2.44-35.39S68.67,356.88,72,357.19Z" transform="translate(-12.21 -70.83)" fill="#eff28b"></path>
                            <path d="M82.25,386c68.25,19.94,85.83,47.33,114.78,53.46,80.78,17.11,131.53-8.58,172.93-31.1,63.09-30.4,66.43-115.65,56.42-186.9C422.57,360.35,230.85,412,82.25,386Z" transform="translate(-12.21 -70.83)" fill="#d1d161"></path>
                            <path d="M47.23,362.2l5.45-13.27c-4.34-1-6.67-1.74-6.67-1.74-3.34-.31-28,2.14-28,2.14s1.83,32.38,2.44,35.39c0,0,19.27-1,34.8-1.35Z" transform="translate(-12.21 -70.83)" fill="#606045"></path>
                            <path d="M360.22,81.24l-2.06,23.57,42.6,8.52-.35-1L402.85,77Z" transform="translate(-12.21 -70.83)" fill="#606045"></path>
                            <path d="M46,347.19S152,381.5,275,292.5s82.81-183.38,82.81-183.38l2.44-27.88L402.85,77l-2.44,35.39s85.25,240.21-30.45,296c-41.4,22.52-92.15,48.21-172.93,31.1C167,433,149.16,403.72,74,383.65c-5.19-1.39-53.58,1.07-53.58,1.07-.61-3-2.44-35.39-2.44-35.39S42.67,346.88,46,347.19Z" transform="translate(-12.21 -70.83)" fill="none" stroke="#606045" stroke-miterlimit="10" stroke-width="14"></path>
                        </g>
                    </svg>
                </div>
            </div>
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
