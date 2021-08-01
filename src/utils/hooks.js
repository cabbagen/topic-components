
export const upload = Symbol.for('inner-upload');

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
