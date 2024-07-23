"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHttpBody = processHttpBody;
exports.writeResponse = writeResponse;
const busboy_1 = __importDefault(require("busboy"));
function processHttpBody(request) {
    return new Promise((resolve, reject) => {
        const bb = (0, busboy_1.default)({ headers: request.headers });
        const object = {};
        bb.on('field', (name, value) => object[name] = value);
        bb.on('close', () => resolve(object));
        request.pipe(bb);
    });
}
function writeResponse(response, data, code = 200) {
    const body = JSON.stringify(data);
    response.writeHead(code, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
    })
        .end(body);
}
