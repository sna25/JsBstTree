"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const port = process.env.port || 1425;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bst Api\n');
}).listen(port);
//# sourceMappingURL=server.js.map