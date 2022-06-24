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

    printRoot = (): void => {
        if (this.level !== 0) {
            console.log('Error: Not a root!');
            return;
        }

        console.log('\n=== Tree ===\n');
        const session: string = guid();
        let node: Leaf = this;
        let go: boolean = true;

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