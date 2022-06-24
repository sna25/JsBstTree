'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    console.log('GET /')
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('BstApi!')
});

router.get('/test', function (request, response) {
    console.log('GET /test')
    var id = request.query.id;
    console.log(id)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('Test ' + id)
});

router.post('/', function (request, response) {
    console.log('POST /')
    console.dir(request.body)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('Data posted')
})

module.exports = router;
