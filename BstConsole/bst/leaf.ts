import treeData from '../data/treeData';
import { guid, repeatString } from '../helpers/helper';
import config from '../tsconfig.json';

export default class Leaf {

    value: number | undefined;
    top: Leaf | undefined;
    left: Leaf | undefined;
    right: Leaf | undefined;
    visited: string | undefined;
    level: number | undefined;

    constructor(value) {
        this.value = value;
        this.top = undefined;
        this.left = undefined;
        this.right = undefined;
        this.visited = undefined;
        this.level = 0;
    }

    add = (value): boolean => {
        let node: Leaf = this;
        let go: boolean = true;
        while (go) {
            if (config.bstRepeat !== true && value === node.value) {
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
    }

    print = (): void => {
        const margin: string = repeatString(`${'\u00A0'}`, 5 * this.level)
        console.log(`${margin}(${this.level}|${this.value})`);
    }

    printRoot = (toScreen: boolean): treeData => {
        let data: treeData = new treeData(); 
        if (this.level !== 0) {
            console.log('Error: Not a root!');
            return data;
        }

        toScreen 
            ? console.log('\n=== Tree ===\n') 
            : data.nodes.push(this.value); // Save to DB root

        const session: string = guid();
        let node: Leaf = this;
        let go: boolean = true;

        //Loop visit tree nodes only once
        while (go) {
            // Save to DB from root
            if (!toScreen && session !== node.visited){
                if (node.left?.value ?? false){
                    data.nodes.push(node.left.value);
                }
                if (node.right?.value ?? false){
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
            if (toScreen && session !== node.visited){
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
    }
}