export function loadImageUrlAsync(imageElement: HTMLImageElement, url: string) {
    return new Promise((resolve, reject) => {
        let load = () => {
            imageElement.removeEventListener("load", load);
            imageElement.removeEventListener("error", error);
            resolve();
        };
        let error = e => {
            imageElement.removeEventListener("load", load);
            imageElement.removeEventListener("error", error);
            reject(e);
        };
        imageElement.addEventListener("load", load);
        imageElement.addEventListener("error", error);
        imageElement.src = url;
    });
}