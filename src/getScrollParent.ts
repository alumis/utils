export function getScrollParent(element: HTMLElement, includeHidden?: boolean) {
    let style = getComputedStyle(element), excludeStaticParent = style.position === "absolute", overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
    if (style.position === "fixed")
        return document.scrollingElement || document.documentElement;
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        style = getComputedStyle(parent);
        if (excludeStaticParent && style.position === "static")
            continue;
        if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX))
            return parent;
    }
    return document.scrollingElement || document.documentElement;
}