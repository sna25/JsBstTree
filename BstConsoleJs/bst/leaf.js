'use strict';
import { guid, repeatString } from '../helpers/helper.js';
import config from '../config.json' assert { type: 'json' };

export default class Leaf {

    constructor(value) {
        this.value = value;
        this.top = undefined;
        this.left = undefined;
        this.right = undefined;
        this.visited = undefined;
        this.level = 0;
    }

    add = (value) => {
        let node = this;
        let go = true;
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

    print = () => {
        const margin = repeatString(`${'\u00A0'}`, 5 * this.level)
        console.log(`${margin}(${this.level}|${this.value})`);
    }

    printRoot = () => {
        if (this.level !== 0) {
            console.log('Error: Not a root!');
            return;
        }

        console.log('\n=== Tree ===\n');
        const session = guid();
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
    }
}