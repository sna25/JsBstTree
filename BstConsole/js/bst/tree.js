"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaf_1 = __importDefault(require("./leaf"));
const program_1 = __importDefault(require("../common/program"));
const helper_1 = require("../helpers/helper");
class Tree extends program_1.default {
    constructor() {
        super();
        this.run = () => {
            console.log('\nMENU:');
            console.log('Q - Quit');
            console.log('L - Load');
            console.log('S - Save');
            console.log('R - Reset');
            console.log('\nInput number');
            let root = undefined;
            const stdin = process.openStdin();
            stdin.resume();
            stdin.on('data', function (keydata) {
                const key = keydata.toString().trim();
                (0, helper_1.quit)(key);
                switch (key) {
                    case 'r':
                    case 'R':
                        root = undefined;
                        break;
                    default:
                        const value = Number.parseInt(key);
                        if (!isNaN(value)) {
                            let print = true;
                            if (root === undefined) {
                                root = new leaf_1.default(value);
                            }
                            else {
                                print = root.add(value);
                            }
                            if (print) {
                                root.printRoot();
                            }
                        }
                        else
                            console.log(`\nError: ${key} is not a number!`);
                }
                console.log('\nInput number');
            });
        };
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map