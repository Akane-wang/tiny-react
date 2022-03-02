const path = require('path');
const { resolve } = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
    mode: 'development', //'production',
    entry: resolve("src/index.ts"), // 入口
    // entry: resolve('src/pages/index'),
    output: { // 出口
        path: resolve("dist"),
        filename: 'index.js',
        // libraryTarget: 'commonjs2'
    },
    // 本地化开发
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 520,
    },
    context: path.join(__dirname, '..'),
    // TODO: 也许测试时不能有这个，发包时记得还回去
    // externals: {
    //     react: 'react',
    //     'react-dom': 'react-dom'
    // },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.d.ts', '.css', '.less', '.module.less'],
        alias: {
            '@': resolve("./src"),
            react: resolve('./node_modules/react')
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
            },
            // 处理图片
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     loader: 'file-loader',
            //     options: {

            //     },
            //     include: []
            // }
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader',
            //     include: [
            //         resolve('src')
            //     ]
            // }
        ]
    },
    plugins: [
        // 将 css 文件单独抽离的 plugin
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: true
        }),
        new HtmlWebpackPlugin(
            {
                template: 'src/demo/index.html'
            }
        )
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     openAnalyzer: false
        // })
    ],
}
