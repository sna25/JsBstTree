import Leaf from './leaf';
import Program from '../common/program';
import { quit } from '../helpers/helper';
import treeData from '../data/treeData';
import {getTreeData, postTreeData} from '../client/httpClient';

export default class Tree extends Program {

    load: boolean;
    save: boolean;

    constructor() { 
        super();
        this.load = false;
        this.save = false;
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
        stdin.on('data', async function (keydata) {
            const key: string = keydata.toString().trim();
            quit(key);

            if (this.load)
            {
                this.load = false;
                console.log('\nEnter tree Id');
                const data: treeData = await getTreeData(key);
                root = undefined;
                if (data.nodes !== undefined){
                    for (const value of data.nodes){
                        root === undefined ? 
                            root = new Leaf(value) 
                            : root.add(value);
                    }
                    root.printRoot(true);
                }
                else{
                    console.log(`Tree: '${key}' not found`);
                }
            }
            else if (this.save)
            {
                this.save = false;
                console.log('\nEnter tree Id');
                const data = root.printRoot(false);
                console.log(data);
                if (await postTreeData(key, data)){
                    console.log('\nTree saved successfully');
                }
            }
            else{
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
                        const value: number = Number.parseInt(key);
                        if (!isNaN(value)) {
                            let print: boolean = true;
                            root === undefined ? 
                                root = new Leaf(value) 
                                : print = root.add(value);
                            if (print) {
                                root.printRoot(true);
                            }
                        }
                        else{
                            console.log(`\nError: ${key} is not a number!`);
                        }
                }
            }
            if (!this.save && !this.load)
                console.log('\nInput number');
        })
    }
}