import http = require('http');
const port = process.env.port || 1425
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bst Api\n');
}).listen(port);