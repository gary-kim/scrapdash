const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const package = require('./package.json');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
});
