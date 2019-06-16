
export function loadImageUrlAsync(imageElement: HTMLImageElement, url: string) {

    return new Promise((resolve, reject) => {

        let onLoad = () => {

            imageElement.removeEventListener("load", onLoad);
            imageElement.removeEventListener("error", onError);

            resolve();
        };

        let onError = e => {

            imageElement.removeEventListener("load", onLoad);
            imageElement.removeEventListener("error", onError);

            reject(e);
        };

        imageElement.addEventListener("load", onLoad);
        imageElement.addEventListener("error", onError);

        imageElement.src = url;
    });
}