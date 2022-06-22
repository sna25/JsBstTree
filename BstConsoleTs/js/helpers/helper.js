"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeatString = exports.guid = exports.quit = void 0;
function quit(key) {
    if (key === 'q' || key === 'Q') {
        process.exit();
    }
}
exports.quit = quit;
;
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.guid = guid;
;
function repeatString(str, num) {
    return str.repeat(num);
}
exports.repeatString = repeatString;
;
//# sourceMappingURL=helper.js.map