
export default class Program {
    constructor() {
    }

    run = (): void => {
        console.log('\nMENU:');
        console.log('Q - Quit');
        console.log('\nTest program');
        const stdin: NodeJS.Socket = process.openStdin();
        stdin.resume();
        stdin.on('data', function (keydata) {
            const key: string = keydata.toString().trim();
            process.exit();
        })
    }
}