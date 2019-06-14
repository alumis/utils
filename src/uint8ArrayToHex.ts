export function uint8ArrayToHex(uint8Array: Uint8Array) {

    let length = (<Uint8Array>this).length, hexadecimals: string[] = new Array<string>(length * 2);

    for (let i = 0; i < length; ++i) {

        let hexadecimal = (<Uint8Array>this)[i].toString(16);

        hexadecimals[i] = hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
    }

    return hexadecimals.join("");
};