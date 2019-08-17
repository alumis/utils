export function Uint8ArrayToHex(data: Uint8Array) {
    let hexadecimals: string[] = new Array<string>(data.length * 2);
    for (let i = 0, length = data.length; i < length; ++i) {
        let hexadecimal = data[i].toString(16);
        hexadecimals[i] = hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
    }
    return hexadecimals.join("");
}
