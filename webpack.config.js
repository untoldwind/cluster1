const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        devtool: 'source-map',
        entry: {
            'app': ['./src/renderer/index.js']
        },
        output: {
            path: __dirname + '/build/',
            filename: '[name].js',
            sourceMapFilename: '[name].js.map',
            chunkFilename: '[id].chunk.js'
        },
        resolve: {
            extensions: ['', '.jsx', '.js', '.json']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: [
                            [
                                "es2015", {
                                    "loose": true
                                }
                            ],
                            "stage-0"
                        ],
                        plugins: [
                            ["transform-decorators-legacy"],
                            [
                                "transform-react-jsx", {
                                    "pragma": "h"
                                }
                            ]
                        ]
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/renderer/index.html'
            }),
            new CopyWebpackPlugin([
                {
                    from: __dirname + '/node_modules/@salesforce-ux/design-system/assets',
                    to: __dirname + '/build/assets'
                }
            ])
        ],
        target: 'electron-renderer',
        devServer: {
            port: process.env.PORT || 19998,
            contentBase: __dirname + '/build/',
            outputPath: __dirname + '/build/',
            inline: true,
            hot: true,
            historyApiFallback: true
        }
    }, {
        devtool: 'source-map',
        entry: {
            'main': ['./src/main/main.js']
        },
        output: {
            path: __dirname + '/build/',
            filename: '[name].js',
            sourceMapFilename: '[name].js.map',
            chunkFilename: '[id].chunk.js'
        },
        resolve: {
            extensions: ['', '.js', '.json']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ["es2015"]
                    }
                }, {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        plugins: [
          new CopyWebpackPlugin([
                {
                    from: __dirname + '/src/main/package.json'
                }
            ])],
        node: {
            __dirname: false,
            __filename: false
        },
        target: 'electron-main'
    }
];
