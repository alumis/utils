export function uint8ArrayToHex(uint8Array: Uint8Array) {
    let hexadecimals: string[] = new Array<string>(length * 2);
    for (let i = 0, length = uint8Array.length; i < length; ++i) {
        let hexadecimal = (<Uint8Array>this)[i].toString(16);
        hexadecimals[i] = hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
    }
    return hexadecimals.join("");
}