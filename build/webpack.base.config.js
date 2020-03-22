const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// js loader
const jsLoaderOptions = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
        path.resolve(__dirname,'../src'),
        path.resolve(__dirname,'../node_modules/view-design'),
    ],
    options: {
        presets: ['@babel/preset-env'],
    }
};

// less loader
const lessLoaderOptions = {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
};

// css loader
const cssLoaderOptions = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
};

// vue loader
const vueLoaderOptions = {
    test: /\.vue$/,
    loader: 'vue-loader',
}

// file loader
const fileLoaderOptions = {
    test: /\.(ttf|eot|woff|woff2|svg)$/,
    use: [{
        loader: 'file-loader',
        options: {
            outputPath: '../dist/fonts/',
        },
    }],
}

// url loader
const urlLoaderOptions = {
    test: /\.(png|jpg|gif)$/i,
    loader: 'url-loader',
    options: {
        limit: 8192
    },
};

module.exports = {
    entry: {
        index: './entry/index.js',
    },

    module: {
        rules: [vueLoaderOptions, jsLoaderOptions, lessLoaderOptions, cssLoaderOptions, fileLoaderOptions, urlLoaderOptions],
    },

    plugins: [
        new VueLoaderPlugin(),
    ],
};
