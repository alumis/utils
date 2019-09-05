import { OperationCancelledError } from "./OperationCancelledError";

export async function dontThrowOperationCancelledErrorAsync<TValue>(promise: Promise<TValue>) {
    try {
        await promise;
    }
    catch (e) {
        if (e instanceof OperationCancelledError)
            return;
        throw e;
    }
}