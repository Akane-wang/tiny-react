const path = require('path');
const { resolve } = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production',
    context: path.join(__dirname, '..'),
    mode: "production",
    entry: resolve("src/index.ts"),
    output: {
        path: resolve("dist"),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.d.ts', '.css', '.less', '.module.less'],
        alias: {
            '@': resolve("src")
        },
    },
    stats: "detailed",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // 'style-loader', // only for development
                    MiniCssExtractPlugin.loader,
                    {
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
                use: [
                    MiniCssExtractPlugin.loader,
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
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    resolve('src')
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: true
        })
    ],
}