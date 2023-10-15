
export function createArray(n) {
    return Array.from({ length: n }, (_, i) => i);
}

export function sliceString(string, showMore) {
    if (showMore) return string;
    return string.slice(0, 50) + "...";
}