"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tree_1 = __importDefault(require("./bst/tree"));
const program_1 = __importDefault(require("./common/program"));
const tsconfig_json_1 = __importDefault(require("./tsconfig.json"));
console.log('\nLOADING: ts ' + tsconfig_json_1.default.startup);
let program = undefined;
switch (tsconfig_json_1.default.startup) {
    case 'bst':
        program = new tree_1.default();
        break;
    default:
        program = new program_1.default();
        break;
}
if (program !== undefined) {
    console.log('\nRUN: ts ' + tsconfig_json_1.default.startup);
    program.run();
}
else
    console.log('\nLOAD ERROR: Program not found');
//# sourceMappingURL=app.js.map