const   webpack = require('webpack'),
        WebpackNotifierPlugin = require('webpack-notifier'),
        { CheckerPlugin } = require('awesome-typescript-loader'),
        helpers = require('./helpers'),
        root = helpers.root.bind(this, '..');

const   LIB_NAME = require('../package.json').name;
        MINIMIZE = !!require('yargs').argv.p;

module.exports = function makeWebpackConfig() {
    let config = {};

    config.devtool = 'source-map';

    config.entry = {
        [LIB_NAME]: './index.ts',
        [LIB_NAME + '.bundle']: './index.bundle.ts'
    };

    config.output = {
        path: root('build'),
        filename: MINIMIZE ? '[name].min.js' : '[name].js',
        library: LIB_NAME,
        libraryTarget: 'umd'
    };

    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js']
    };

    config.module = {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    };

    config.plugins = [
        new CheckerPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new WebpackNotifierPlugin()
    ];

    if (MINIMIZE) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: {keep_fnames: true}})
        );
    }

    return config;
}();
