import { CancellationToken, OperationCancelledError } from '@alumis/cancellationtoken';

export function delayAsync(duration: number, cancellationToken: CancellationToken) {

    return new Promise<void>((resolve, reject) => {

        cancellationToken.addListener(cancelListener);

        const timerId = setTimeout(() => {

            cancellationToken.removeListener(cancelListener);
            resolve();

        }, duration);

        function cancelListener() {

            clearTimeout(timerId);
            reject(new OperationCancelledError());
        }
    });
}