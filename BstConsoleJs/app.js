'use strict';
import Tree from './bst/tree.js';
import Program from './common/program.js';
import config from './config.json' assert { type: 'json' };

console.log('\nLOADING: js ' + config.startup);

let program = undefined;

switch (config.startup) {
    case 'bst':
        program = new Tree();
        break;
    default:
        program = new Program();
        break;
}

if (program !== undefined) {
    console.log('\nRUN: js ' + config.startup);
    program.run();
}
else
    console.log('\nLOAD ERROR: Program not found');