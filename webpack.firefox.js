const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const package = require('./package.json');
const path = require('path');
const helpers = require('./webpack-helpers');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyPlugin([
            {
                from: path.join(__dirname, 'src', 'manifest.json'),
                to: 'manifest.json',
                transform(content) {
                    return helpers.setManifestVersion(content, package.version)
                }
            }
        ])
    ]
});
