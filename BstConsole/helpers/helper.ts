
export function quit(key): void {
    if (key === 'q' || key === 'Q') {
        process.exit();
    }
};

export function guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r: number = Math.random() * 16 | 0,
              v: number = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export function repeatString(str, num): string {
    return str.repeat(num);
};