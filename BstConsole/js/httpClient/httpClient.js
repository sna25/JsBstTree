"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsconfig_json_1 = __importDefault(require("../tsconfig.json"));
const http = require('http');
class httpClient {
    constructor() {
        this.run = (id) => {
            const req = http.get(`${tsconfig_json_1.default.connectionString}?id=${id}`, (res) => {
                if (res.statusCode !== 200) {
                    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                    res.resume();
                    return;
                }
                let data;
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('close', () => {
                    console.log('Retrieved all data');
                    console.log(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                console.error(`Encountered an error trying to make a request: ${err.message}`);
            });
            return undefined;
        };
    }
}
exports.default = httpClient;
//# sourceMappingURL=httpClient.js.map