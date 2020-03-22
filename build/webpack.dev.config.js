
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = Object.assign(webpackBaseConfig, {
    devtool: 'eval-source-map',

    output: {
        path: path.join(__dirname, '../dist/mobile'),
        filename: 'topic-component.js',
        library: 'ATopic',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
});