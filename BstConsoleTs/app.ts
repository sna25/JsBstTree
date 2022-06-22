import Tree from './bst/tree';
import Program from './common/program';
import config from './tsconfig.json';

console.log('\nLOADING: ts ' + config.startup);

let program: Program = undefined;

switch (config.startup) {
    case 'bst':
        program = new Tree();
        break;
    default:
        program = new Program();
        break;
}

if (program !== undefined) {
    console.log('\nRUN: ts ' + config.startup);
    program.run();
}
else
    console.log('\nLOAD ERROR: Program not found');