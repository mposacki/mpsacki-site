export const matchesPolyfill = () => {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }
}