var crypto = require('crypto');

export function getComputedStyle(element, property) {
    if (typeof window.getComputedStyle !== 'undefined') {
        return window.getComputedStyle(element).getPropertyValue(property);
    }
    return element.currentStyle.getPropertyValue(property);
}

export function makeMD5(text) {
    return crypto.createHash('md5').update(text).digest("hex");
}
