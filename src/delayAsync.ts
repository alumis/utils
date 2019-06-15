import { CancellationToken, OperationCancelledError } from '@alumis/cancellationtoken';

export function delayAsync(timeout: number, cancellationToken?: CancellationToken) {

    if (cancellationToken) {

        return new Promise((resolve, reject) => {

            let cancellationListener = () => {
                clearTimeout(handle);
                reject(new OperationCancelledError());
            };

            cancellationToken.addListener(cancellationListener);

            let handle = setTimeout(() => {

                cancellationToken.removeListener(cancellationListener);
                resolve();

            }, timeout);
        });
    }

    else return new Promise(r => { setTimeout(r, timeout); });
}