export class MethodNotImplementedError extends Error {
    constructor(name: string) {
        super(`Method '${name}' has not been implemented`);
    }
}