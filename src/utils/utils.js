
const crypto = require('crypto');

export function getComputedStyle(element, property) {
    if (typeof window.getComputedStyle !== 'undefined') {
        return window.getComputedStyle(element).getPropertyValue(property);
    }
    return element.currentStyle.getPropertyValue(property);
}

export function makeMD5(text) {
    return crypto.createHash('md5').update(text).digest("hex");
}

export function getQuery() {
    const result = {};
    const searchText = window.location.search.slice(1);

    if (searchText === '') {
        return result;
    }

    const searchList = searchText.split('&');

    for (let i = 0, len = searchList.length; i < len; i++) {
        result[searchList[i].split('=')[0]] = searchList[i].split('=')[1];
    }
    return result;
}

export function linkTo(link) {
    window.location.href = link;
}
