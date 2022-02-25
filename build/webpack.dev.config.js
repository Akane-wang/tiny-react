'use strict';
const fs = require('fs');
const { merge } = require('webpack-merge');
const [ rafa ] = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(rafa, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host: '127.0.0.1',
        port: 474,
        // open: 'chrome',
        // Enable webpack's Hot Module Replacement feature
        hot: true,
        historyApiFallback: false,
        https: {
            key: fs.readFileSync(resolve('ssl/wq-local.reolink.dev.key')),
            cert: fs.readFileSync(resolve('ssl/wq-local.reolink.dev.crt')),
            ca: fs.readFileSync((resolve('ssl/myCA.pem')))

        },
        allowedHosts: 'all',
        devMiddleware: {
            writeToDisk: true
        }
    },
    plugins: [
        // will generate a HTML file named [filename]
        new HtmlWebpackPlugin({
            filename: resolve('dist/client/index.html'),
            template: resolve('src/demo/index.html')
        }),
        new CleanWebpackPlugin()
    ]
});
