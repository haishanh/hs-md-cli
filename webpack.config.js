'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './cli.js',
  output: {
    filename: 'cli.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  target: 'node',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          toplevel: true,
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node\n',
      raw: true
    })
  ]
};
