export function Uint8ArrayToBase64(data: Uint8Array) {
    const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let a, c, s = 0, r = [];
    for (let n = 0, length = data.length; n < length; n++) {
        c = data[n];
        if (s === 0) {
            r.push(table.charAt((c >> 2) & 63));
            a = (c & 3) << 4;
        }
        else if (s === 1) {
            r.push(table.charAt(a | ((c >> 4) & 15)));
            a = (c & 15) << 2;
        }
        else if (s === 2) {
            r.push(table.charAt(a | ((c >> 6) & 3)));
            r.push(table.charAt(c & 63));
        }
        s += 1;
        if (s === 3)
            s = 0;
    }
    const r2 = [];
    if (s > 0) {
        r2.push(table.charAt(a));
        r2.push('=');
    }
    if (s === 1)
        r2.push('=');
    return r.join('') + r2.join('');
}