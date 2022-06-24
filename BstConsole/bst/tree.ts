import Leaf from './leaf';
import Program from '../common/program';
import { quit } from '../helpers/helper';

export default class Tree extends Program {
    constructor() { 
        super();
    }

    run = (): void => {
        console.log('\nMENU:');
        console.log('Q - Quit');
        console.log('L - Load');
        console.log('S - Save');
        console.log('R - Reset');
        console.log('\nInput number');
        let root: Leaf = undefined;

        const stdin: NodeJS.Socket = process.openStdin();
        stdin.resume();
        stdin.on('data', function (keydata) {
            const key: string = keydata.toString().trim();
            quit(key);

            switch (key) {
                case 'r':
                case 'R':
                    root = undefined;
                    break;
                default:
                    const value: number = Number.parseInt(key);
                    if (!isNaN(value)) {
                        let print: boolean = true;
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