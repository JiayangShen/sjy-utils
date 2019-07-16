const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
//const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
    target: 'node',
    devtool: isProd ? false : '#source-map',
    entry: './src/server-main.js',
    output: {
        filename: 'js/server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    /*externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/
    }),*/
    externals: Object.keys(require('../package.json').dependencies),
    performance: {
      hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                VUE_ENV: '"server"'
            }
        }),
        new VueSSRServerPlugin()
    ]
})
