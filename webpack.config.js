'use strict';

var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/src",
    output: {
        path: __dirname + "/public",
        filename: "build.js",
        library: "endouble"
    },

    devtool: "source-map",

    watch: true,

    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};