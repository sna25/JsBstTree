"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Program {
    constructor() {
        this.run = () => {
            console.log('\nMENU:');
            console.log('Q - Quit');
            console.log('\nTest program');
            const stdin = process.openStdin();
            stdin.resume();
            stdin.on('data', function (keydata) {
                const key = keydata.toString().trim();
                process.exit();
            });
        };
    }
}
exports.default = Program;
//# sourceMappingURL=program.js.map