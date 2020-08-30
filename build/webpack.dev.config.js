
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = Object.assign(webpackBaseConfig, {
    devtool: 'eval-source-map',

    entry: Object.assign({}, webpackBaseConfig.entry, {
        app: './src/mobile/index.js',
    }),
    
    output: {
        path: path.join(__dirname, '../dist/mobile'),
        filename: '[name].boundle.js',
    },

    plugins: webpackBaseConfig.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'index',
            filename: 'topic-components.js',
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            template: './views/index.html'
        }),
    ]),
});