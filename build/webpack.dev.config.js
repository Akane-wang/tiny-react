const { merge } = require('webpack-merge');
const { resolve } = require('./utils');
const { basicConfig } = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(basicConfig, {
    mode: 'development',
    // 优化
    optimization: {
        usedExports: true, // tree shaking, 未使用的部分不进行导出
        concatenateModules: true // 告知webpack 去寻找模块图形中的片段，哪些是可安全的合并到单一模块中
    },
    // TODO：要不要动态entry
    entry: resolve('src/pages/index'),
    output: { // 出口
        path: resolve("dist"),
        filename: 'index.js',
        // libraryTarget: 'commonjs2'
    },
    // 本地化开发
    devServer: {
        static: resolve(__dirname, 'dist'),
        port: 520,
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: 'src/demo/index.html'
            }
        )
    ],
})
