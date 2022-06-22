'use strict';
export default class Program {
    constructor() {
    }

    run = () => {
        console.log('\nMENU:');
        console.log('Q - Quit');
        console.log('\nTest program');
        const stdin = process.openStdin();
        stdin.resume();
        stdin.on('data', function (keydata) {
            const key = keydata.toString().trim();
            process.exit();
        })
    }
}