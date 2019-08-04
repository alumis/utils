export function firstLetterCapitalized(str: string) {
    return typeof str === "string" && 1 <= str.length ? str.charAt(0).toLocaleUpperCase() + str.substr(1) : str;
}