export class OperationCancelledError extends Error {
    constructor() {
        super("Operation was cancelled");
    }
}