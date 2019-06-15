
export function loadScriptAsyn(url: string) {

    let promise = promises.get(url);

    if (promise)
        return promise;

    let resolve: (value?) => void, reject: (reason?) => void;

    promises.set(url, promise = new Promise((res, rej) => { resolve = res; reject = rej; }));

    (async () => {

        try {

            console.info(`Loading ${url}`);

            let t0 = performance.now();
            let script = document.createElement("script");

            script.onload = () => {

                let t1 = performance.now();

                resolve();

                console.info(`Loaded ${url} in ${t1 - t0} ms`);
            };

            script.onerror = e => {

                if (promise === promises.get(url))
                    promises.delete(url);

                reject(e);
            };

            script.src = url;

            document.head.appendChild(script);
        }

        catch (e) {

            promises.delete(url);
            reject(e);
            return;
        }

    })();

    return promise;
}

let promises = new Map<string, Promise<void>>();