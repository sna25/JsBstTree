'use strict';
import Leaf from './leaf.js';
import Program from '../common/program.js';
import { quit } from '../helpers/helper.js';

export default class Tree extends Program {
    constructor() {
        super();
    }

    run = () => {
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
            quit(key);

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
                            root = new Leaf(value);
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
        })
    }
}