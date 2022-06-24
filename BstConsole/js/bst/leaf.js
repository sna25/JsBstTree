"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helpers/helper");
const tsconfig_json_1 = __importDefault(require("../tsconfig.json"));
class Leaf {
    constructor(value) {
        this.add = (value) => {
            let node = this;
            let go = true;
            while (go) {
                if (tsconfig_json_1.default.bstRepeat !== true && value === node.value) {
                    console.log(`\nError: Wrong value: ${value} already exists!`);
                    return false;
                }
                if (value < node.value) {
                    if (node.left === undefined) {
                        node.left = new Leaf(value);
                        node.left.top = node;
                        node.left.level = node.level + 1;
                        go = false;
                    }
                    else {
                        node = node.left;
                    }
                }
                else if (value >= node.value) {
                    if (node.right === undefined) {
                        node.right = new Leaf(value);
                        node.right.top = node;
                        node.right.level = node.level + 1;
                        go = false;
                    }
                    else {
                        node = node.right;
                    }
                }
            }
            return true;
        };
        this.print = () => {
            const margin = (0, helper_1.repeatString)(`${'\u00A0'}`, 5 * this.level);
            console.log(`${margin}(${this.level}|${this.value})`);
        };
        this.printRoot = () => {
            if (this.level !== 0) {
                console.log('Error: Not a root!');
                return;
            }
            console.log('\n=== Tree ===\n');
            const session = (0, helper_1.guid)();
            let node = this;
            let go = true;
            while (go) {
                if (node.left !== undefined && session !== node.left.visited) {
                    node = node.left;
                    continue;
                }
                if (session !== node.visited) {
                    node.print();
                    node.visited = session;
                }
                if (node.right !== undefined && session !== node.right.visited) {
                    node = node.right;
                    continue;
                }
                if (node.top !== undefined) {
                    node = node.top;
                    continue;
                }
                go = false;
            }
        };
        this.value = value;
        this.top = undefined;
        this.left = undefined;
        this.right = undefined;
        this.visited = undefined;
        this.level = 0;
    }
}
exports.default = Leaf;
//# sourceMappingURL=leaf.js.map