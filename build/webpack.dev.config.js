
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = Object.assign(webpackBaseConfig, {
    devtool: 'eval-source-map',

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'topic-component.min.js',
        library: 'ATopic',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
});