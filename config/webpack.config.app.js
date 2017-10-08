const   webpack = require('webpack'),
        WebpackNotifierPlugin = require('webpack-notifier'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        CopyWebpackPlugin = require('copy-webpack-plugin'),
        { CheckerPlugin } = require('awesome-typescript-loader'),
        helpers = require('./helpers'),
        root = helpers.root.bind(this, '..');

const   ENV = process.env.npm_lifecycle_event,
        isProd = ENV === 'build',
        isDev = ENV === 'dev';

module.exports = function makeWebpackConfig() {
    let config = {};

    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.entry = {
        'app': './src/app.ts'
    };

    config.output = {
        path: root('dist'),
        publicPath: isProd ? '' : 'http://localhost:8080/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.html']
    };

    config.module = {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs[]=img:src&attrs[]=source:src',
                include: root('templates')
            }
        ]
    };

    config.plugins = [
        new CheckerPlugin(),

        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),

        new ExtractTextPlugin({
            filename: isProd ? 'css/[name].[hash].css' : 'css/[name].css'
        }),

        new HtmlWebpackPlugin({
            title: 'CreateJS - TS',
            template: './index.html',
            chunksSortMode: 'dependency',
            minify: isProd ? {
                removeComments: true,
                collapseWhitespace: true
            } : false
        }),

        new CopyWebpackPlugin([{
            from: root('src/assets'),
            to: root('dist/assets')
        }]),

        new WebpackNotifierPlugin()
    ];

    if (isDev) {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoEmitOnErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: {keep_fnames: true}}),
        );
    }

    config.devServer = {
        hot: true,
        contentBase: '.',
        historyApiFallback: false,
        quiet: false,
        stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
    };

    return config;
}();
