
export const upload = Symbol.for('inner-upload');
export const request = Symbol.for('fetch-request');

export const iconfont = Symbol.for('iconfont-resource');

const defaultGlobalProperties = {
    [upload]: function() {
        return {
            name: 'file',
            showUploadList: false,
            action: 'http://localhost:7001/handle/upload',
            prevFile: function(file) {
                return `http://localhost:7001/${file}`;
            },
        };
    },
    [request]: async function(url, method, data) {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                'token': window.sessionStorage.getItem('token') || '',
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
};

const instance = Object.assign({}, defaultGlobalProperties);

export function handleRegistTopicGlobalProperties(options) {
    for (let prop in options) {
        handleRegistTopicGlobalProperty(prop, options[prop]);
    }
}

export function handleRegistTopicGlobalProperty(property, callback) {
    instance[property] = callback;
}

export function getRegistedTopicGlobalProperty(property) {
    return instance[property];
}
