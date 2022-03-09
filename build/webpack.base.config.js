const path = require('path');
const webpack = require('webpack');
const { resolve } = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const basicConfig = {
    context: path.join(__dirname, '..'),
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.d.ts', '.css', '.less', '.module.less'],
        alias: {
            '@': resolve('./src'),
            react: resolve('./node_modules/react'),
            'react-dom': resolve('./node_modules/react-dom')
        },
    },
    devtool: 'source-map',
    stats: "detailed",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // 'style-loader', // only for development
                    MiniCssExtractPlugin.loader,
                    {
                        // 解析css代码，处理css依赖，如@import和url()
                        loader: 'css-loader', options: {
                            url: false,
                        }
                    },
                    'less-loader',
                ],
                include: [
                    resolve('src')
                ]
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [ // 运行顺序是从下到上
                    // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                    MiniCssExtractPlugin.loader, // 单独把css分离出来, 不让他打包进js里
                    {
                        loader: 'css-loader', options: {
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [
                    resolve('src')
                ],
                options: {
                    compiler: 'ttypescript',
                },
            }
        ]
    },
    plugins: [
        // 将 css 文件单独抽离的 plugin
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: true
        }),
        new webpack.ProgressPlugin(),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     openAnalyzer: false
        // })
    ],
}

module.exports = { basicConfig };
