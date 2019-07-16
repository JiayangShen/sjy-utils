const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve('./webroot'),
        publicPath: '/',
        filename: isProd ? 'js/[name].[chunkhash:6].js' : 'js/[name].[hash:6].js',
        chunkFilename: 'js/module/[name].[chunkhash:6].js'
    },
    module: {
        noParse: /es6-polyfill\.js$/,
        rules: [
            {
                enforce: "pre",
                test: /\.(js|vue)$/,
                exclude: /node_modules|src[\/\\]lib/,
                loader: 'eslint-loader',
                options: {
                    failOnError: true,
                    outputReport: {
                        filePath: '../eslint.log',
                        formatter: require('eslint/lib/formatters/codeframe')
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules|src[\/\\]lib/,
                loader: 'babel-loader'
            },
            /*{
                test: /src[\/\\]css[\/\\]com[\/\\].+\.css$/,
                use: ['css-loader', 'postcss-loader']
            },*/
            {
                test: /src[\/\\]css[\/\\]main\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                exclude: /src[\/\\]css[\/\\].+\.css$/,
                use: ['to-string-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    //limit: 1,
                    name: 'img/[name].[hash:6].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            util: path.resolve('./src/util'),
            module: path.resolve('./src/module'),
            lib: path.resolve('./src/lib'),
            com: path.resolve('./src/com'),
            img: path.resolve('./src/img'),
            page: path.resolve('./src/page'),
            api: path.resolve('./src/api')
        },
        extensions: ['.js', '.vue']
    },
    performance: {
      maxEntrypointSize: 300000,
      hints: isProd ? 'warning' : false
    },
    plugins: [
        new ExtractTextPlugin({filename: "css/main.[contenthash:6].css"})
    ]
};

if(isProd)
{
    config.plugins.push(
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: false,
                    keep_fargs: false,
                    pure_funcs: [ 'console.log' ],
                    toplevel: true
                    
                }
            })
    );
}
else
{
    config.plugins.push(
        new FriendlyErrorsPlugin()
    );
}

module.exports = config;















