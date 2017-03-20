import webpack, {optimize, HotModuleReplacementPlugin, DefinePlugin} from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import validate from 'webpack-validator';
import merge from 'webpack-merge';

const base = {
    devtool: 'source-map',
    entry: {
        'app': ['babel-polyfill', './src/renderer/index.js']
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
                loader: 'babel-loader',
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
};

export default validate(merge(base, {}));
export const production = validate(merge(base, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}));
