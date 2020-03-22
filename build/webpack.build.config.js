const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = Object.assign(webpackBaseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist/mobile'),
        filename: 'topic-component.min.js',
        library: 'ATopic',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: webpackBaseConfig.plugins.concat([
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]),
});
