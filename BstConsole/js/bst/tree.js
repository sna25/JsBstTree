"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaf_1 = __importDefault(require("./leaf"));
const program_1 = __importDefault(require("../common/program"));
const helper_1 = require("../helpers/helper");
const httpClient_1 = require("../client/httpClient");
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
                return __awaiter(this, void 0, void 0, function* () {
                    const key = keydata.toString().trim();
                    (0, helper_1.quit)(key);
                    if (this.load) {
                        this.load = false;
                        console.log('\nEnter tree Id');
                        const data = yield (0, httpClient_1.getTreeData)(key);
                        root = undefined;
                        if (data.nodes !== undefined) {
                            for (const value of data.nodes) {
                                root === undefined ?
                                    root = new leaf_1.default(value)
                                    : root.add(value);
                            }
                            root.printRoot(true);
                        }
                        else {
                            console.log(`Tree: '${key}' not found`);
                        }
                    }
                    else if (this.save) {
                        this.save = false;
                        console.log('\nEnter tree Id');
                        const data = root.printRoot(false);
                        console.log(data);
                        if (yield (0, httpClient_1.postTreeData)(key, data)) {
                            console.log('\nTree saved successfully');
                        }
                    }
                    else {
                        switch (key.toLowerCase()) {
                            case 'r':
                                root = undefined;
                                break;
                            case 'l':
                                this.load = true;
                                console.log('\nEnter tree Id');
                                break;
                            case 's':
                                this.save = true;
                                console.log('\nEnter tree Id');
                                break;
                            default:
                                const value = Number.parseInt(key);
                                if (!isNaN(value)) {
                                    let print = true;
                                    root === undefined ?
                                        root = new leaf_1.default(value)
                                        : print = root.add(value);
                                    if (print) {
                                        root.printRoot(true);
                                    }
                                }
                                else {
                                    console.log(`\nError: ${key} is not a number!`);
                                }
                        }
                    }
                    if (!this.save && !this.load)
                        console.log('\nInput number');
                });
            });
        };
        this.load = false;
        this.save = false;
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map