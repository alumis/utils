import { CancellationToken } from "./CancellationToken";
import { OperationCancelledError } from "./OperationCancelledError";

export class Semaphore {

    constructor() {

        let head = <SemaphoreQueueEntry>{};
        let tail = <SemaphoreQueueEntry>{};

        (head.next = tail).previous = head;

        this._head = head;
        this._tail = tail;
    }

    private _head: SemaphoreQueueEntry;
    private _tail: SemaphoreQueueEntry;

    waitOneAsync(cancellationtoken?: CancellationToken) {

        if (cancellationtoken) {

            if (cancellationtoken.isCancellationRequested)
                return Promise.reject(new OperationCancelledError());
        }

        return new Promise<void>((resolve, reject) => {

            let current = <SemaphoreQueueEntry>{ resolve: resolve, previous: this._tail.previous, next: this._tail };

            current.previous.next = current;
            current.next.previous = current;

            if (this._head.next === current)
                resolve();

            else if (cancellationtoken) {

                current.cancellationToken = cancellationtoken;

                cancellationtoken.addListener(current.cancellationTokenListener = () => {

                    (current.previous.next = current.next).previous = current.previous;
                    reject(new OperationCancelledError());
                });
            }
        });
    }

    release() {

        let head = this._head, next = head.next.next;
        
        (head.next = next).previous = head;

        if (next !== this._tail) {

            if (next.cancellationToken) {

                next.cancellationToken.removeListener(next.cancellationTokenListener);

                delete next.cancellationToken;
                delete next.cancellationTokenListener;
            }

            let resolve = next.resolve;

            delete next.resolve;
            resolve();
        }
    }
}

interface SemaphoreQueueEntry {

    resolve: () => void;
    previous: SemaphoreQueueEntry;
    next: SemaphoreQueueEntry;
    cancellationToken: CancellationToken;
    cancellationTokenListener: () => void;
}