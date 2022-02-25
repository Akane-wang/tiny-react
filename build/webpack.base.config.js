const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('./utils');
const ESLintPlugin = require('eslint-webpack-plugin');

const defaultConfig = {
    context: path.join(__dirname, '..'),
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.d.ts', '.css', '.less', '.module.less'],
        alias: {
            '@': resolve('src'),
            'STYLES': resolve('src/vm/assets/styles'),
            'BASIC': resolve('src/vm/basic'),
            'COMPONENTS': resolve('src/vm/components'),
            'LANGS': resolve('src/langs'),
            'ENVCONFIG': resolve(`src/config/${process.env.REO_ENV}`),
        }
    },
    // configuration regarding modules
    module: {
        // configure loaders, parser options, etc.
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [
                    resolve('src')
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    resolve('src')
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 500000
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(process.env.REO_ENV)
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist/**/*')]
        }),
        new ESLintPlugin({
            extensions: ['ts', 'js', 'tsx'],
            exclude: ['node_modules', 'dist']
        })
    ]
};

const clientConfig = merge(defaultConfig, {
    context: path.join(__dirname, '..'),
    entry: [resolve('src/index.tsx')],
    output: {
        path: resolve('dist/client'),
        filename: 'js/index.js',
        chunkFilename: 'js/[name].[chunkhash].js',
        library: 'Rafa',
        libraryTarget: 'umd',
        environment: {
            arrowFunction: false,
            bigIntLiteral: false,
            const: false,
            destructuring: false,
            dynamicImport: false,
            forOf: false,
            module: false
        }
    },
    resolve: {
        alias: {
            '$': 'jQuery'
        },
    },
    externals: [
        {
            jquery: 'jQuery'
        }
    ],
    devtool: 'eval-source-map',
    target: 'web',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: true
        })
    ],
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
            }
        ]
    }
});

const serverConfig = merge(defaultConfig, {
    mode: 'none',
    target: 'node',
    entry: ['babel-polyfill', resolve('src/server.tsx')],
    output: {
        filename: 'js/index.js',
        chunkFilename: 'js/[name].js',
        path: resolve('dist/server'),
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // 'style-loader', // only for development
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                exportOnlyLocals: true,
                            }
                        },
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
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                exportOnlyLocals: true,
                            }
                        },
                    }
                ],
            }
        ]
    }
});

const httpManager = merge(defaultConfig, {
    entry: resolve('src/core/api/client.ts'),
    output: {
        path: resolve('dist/httpManager'),
        filename: 'js/index.js',
        library: 'RafaHttpManager',
        libraryTarget: 'window',
        environment: {
            arrowFunction: false,
            bigIntLiteral: false,
            const: false,
            destructuring: false,
            dynamicImport: false,
            forOf: false,
            module: false
        }
    }
});

module.exports = [clientConfig, serverConfig, httpManager];
