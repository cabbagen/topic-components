
export function getComputedStyle(element, property) {
    if (typeof window.getComputedStyle !== 'undefined') {
        return window.getComputedStyle(element).getPropertyValue(property);
    }
    return element.currentStyle.getPropertyValue(property);
}

