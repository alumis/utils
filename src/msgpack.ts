import * as msgpack5 from "msgpack5";

let msgpack = msgpack5();

export function encode(obj) { return <Uint8Array>msgpack.encode(obj); }
export function decode<T>(data: Uint8Array) { return <T>msgpack.decode(data); }