var path = require('path');
var webpack = require('webpack');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new WebpackCleanupPlugin()
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js'
    }
}