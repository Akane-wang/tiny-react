const path = require('path');
const { resolve } = require('./utils');
const { merge } = require('webpack-merge');
const { basicConfig } = require('./webpack.base.config');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = merge(basicConfig,{
    mode: 'production', //'production',
    entry: resolve("src/index.ts"), // 入口
    output: { // 出口
        path: resolve("dist"),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    context: path.join(__dirname, '..'),
    externals: {
        react: 'react',
        'react-dom': 'react-dom'
    },
    plugins: [
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     openAnalyzer: false
        // })
    ],
})
