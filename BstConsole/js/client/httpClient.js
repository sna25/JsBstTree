"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTreeData = exports.getTreeData = void 0;
const tsconfig_json_1 = __importDefault(require("../tsconfig.json"));
const treeData_1 = __importDefault(require("../data/treeData"));
const axios = require('axios');
function getTreeData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = new treeData_1.default();
        let res = yield axios.get(`${tsconfig_json_1.default.connectionString}?id=${id}`).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
        if (res.status !== 200) {
            console.error(`\nDid not get an OK from the server. Code: ${res.status}`);
        }
        data = res.data;
        console.log(data);
        return data;
    });
}
exports.getTreeData = getTreeData;
function postTreeData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield axios.post(`${tsconfig_json_1.default.connectionString}?id=${id}`, data).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            return false;
        });
        if (res.status !== 200) {
            console.error(`\nDid not get an OK from the server. Code: ${res.status}`);
            return false;
        }
        return true;
    });
}
exports.postTreeData = postTreeData;
//# sourceMappingURL=httpClient.js.map