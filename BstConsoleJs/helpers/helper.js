'use strict';
export function quit(key) {
    if (key === 'q' || key === 'Q') {
        process.exit();
    }
};

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export function repeatString(str, num) {
    return str.repeat(num);
};