export function base64ToUint8Array(str: string) {

    const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Standard radix-64

    var c: number;
    var s = 0;
    var a = 0;
    const tl = str.length;
    const r = new Uint8Array(Math.ceil(0.75 * tl));
    var index = 0;

    for (var n = 0; n < tl; n++) {

        c = table.indexOf(str.charAt(n));

        if (c >= 0) {

            if (s)
                r[index++] = a | ((c >> (6 - s)) & 255);

            s = (s + 2) & 7;
            a = (c << s) & 255;
        }
    }

    return r.subarray(0, index);
}