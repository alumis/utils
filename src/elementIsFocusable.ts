export function elementIsFocusable(element: HTMLElement) {
    if (element.hasAttribute("tabindex") && (<HTMLAnchorElement>element).tabIndex === -1)
        return false;
    if (!(element.offsetWidth || element.offsetHeight || element.getClientRects().length) || element.style.visibility === "hidden") // TODO: visibility inherit
        return false;
    switch (element.tagName) {
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
        case "BUTTON":
        case "OBJECT":
            if ((<HTMLInputElement>element).disabled)
                return false;
            for (let fieldset = (<HTMLInputElement>element).parentElement; fieldset; fieldset = fieldset.parentElement) {
                if (fieldset.tagName === "FIELDSET") {
                    if ((<HTMLFieldSetElement>fieldset).disabled)
                        return false;
                    return true;
                }
            }
            return true;
        case "A":
            return !!(<HTMLAnchorElement>element).href;
    }
    return element.hasAttribute("tabindex") && 0 <= element.tabIndex;
}