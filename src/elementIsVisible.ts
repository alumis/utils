export function elementIsVisible(element: Element) {
    let rect: ClientRect = element.getBoundingClientRect();
    return 0 < rect.bottom && rect.top < (innerHeight || document.documentElement.clientHeight) && 0 < rect.right && rect.left < (innerWidth || document.documentElement.clientWidth);
}