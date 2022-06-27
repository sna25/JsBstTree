'use strict';

const treeData = require('../models/treeData.js');
const express = require('express');
const router = express.Router();

router.get('/ping', function (req, res) {
    console.log('GET /ping')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('BstApi')
});

router.get('/', function (req, res) {
    const id = req.query.id;
    console.log(`GET /: ${id}`)

    let tree = new treeData();

    /// MUU
    if (id === '1'){
        tree.nodes = [1, 3, 54, 34, 78, 76, 43, 23, 5, 1, 4, 11];
    }
    else if (id === '2'){
        tree.nodes = [2, 8, 53, 323, 72, 712, 23, 13, 6, 3, 12];
    }
    /// MUU

    if (tree.nodes.length > 0){
        res.status(200, { 'Content-Type': 'application/json' })
        res.json(tree)
    }
    else{
        res.status(204, { 'Content-Type': 'application/json' })
        res.json()
    }
});

router
.post('/', function (req, res) {
    console.log('POST /')
    console.dir(req.body)
    
    let tree = new treeData();
    tree.nodes = req.body.nodes;

    /// MUU
    for (const node of tree.nodes)
    {
        console.log(node);
    }
    /// MUU

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('Data posted')
})

module.exports = router;
