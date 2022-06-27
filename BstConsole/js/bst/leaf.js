"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const treeData_1 = __importDefault(require("../data/treeData"));
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
        this.printRoot = (toScreen) => {
            var _a, _b, _c, _d;
            let data = new treeData_1.default();
            if (this.level !== 0) {
                console.log('Error: Not a root!');
                return data;
            }
            toScreen
                ? console.log('\n=== Tree ===\n')
                : data.nodes.push(this.value); // Save to DB root
            const session = (0, helper_1.guid)();
            let node = this;
            let go = true;
            //Loop visit tree nodes only once
            while (go) {
                // Save to DB from root
                if (!toScreen && session !== node.visited) {
                    if ((_b = (_a = node.left) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : false) {
                        data.nodes.push(node.left.value);
                    }
                    if ((_d = (_c = node.right) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : false) {
                        data.nodes.push(node.right.value);
                    }
                    node.visited = session;
                }
                // Go left
                if (node.left !== undefined && session !== node.left.visited) {
                    node = node.left;
                    continue;
                }
                // Print on screen from left to right
                if (toScreen && session !== node.visited) {
                    node.visited = session;
                    node.print();
                }
                //Go right
                if (node.right !== undefined && session !== node.right.visited) {
                    node = node.right;
                    continue;
                }
                //Go Top
                if (node.top !== undefined) {
                    node = node.top;
                    continue;
                }
                go = false;
            }
            return data;
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