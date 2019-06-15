export function uint8ArrayToBase64(data: Uint8Array) {

    const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    var a;
    var c;
    var l = 0;
    var s = 0;
    var r = [];

    const tl = data.length;

    for (var n = 0; n < tl; n++) {

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

            l += 1;

            r.push(table.charAt(c & 63));
        }

        l += 1;
        s += 1;

        if (s === 3)
            s = 0;
    }

    const r2 = [];

    if (s > 0) {

        r2.push(table.charAt(a));

        l += 1;

        r2.push('=');

        l += 1;
    }

    if (s === 1)
        r2.push('=');

    return r.join('') + r2.join('');
};