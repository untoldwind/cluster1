import webpack, {optimize, HotModuleReplacementPlugin, DefinePlugin} from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import validate from 'webpack-validator';
import merge from 'webpack-merge';

const base = {
    devtool: 'source-map',
    entry: {
        'main': ['babel-polyfill', './src/main/main.js']
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
        ])
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    target: 'electron-main'
}

export const development = validate(merge(base, {
  plugins: [
    new HotModuleReplacementPlugin()
  ]
}));
export default development;
export const production = validate(merge(base, {
  externals: {
    "electron-debug": {},
    "electron-devtools-installer": {}
  },
  plugins: [
    new optimize.UglifyJsPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}));
