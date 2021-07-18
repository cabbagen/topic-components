const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackBaseConfig = require('./webpack.base.config');
const CompressionPlugin = require('compression-webpack-plugin');

const ExtractCSS = new ExtractTextPlugin('topic-comonent.css');

module.exports = Object.assign(webpackBaseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'topic-component.min.js',
        library: 'ATopic',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: webpackBaseConfig.module.rules.map(item => {
            if (item.test.test('x.css') || item.test.test('x.less')) {
                item.use = ExtractCSS.extract({
                    fallback: 'style-loader',
                    use: item.use.slice(1),
                });
            }
            return item;
        })
    },

    plugins: webpackBaseConfig.plugins.concat([
        ExtractCSS,
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
