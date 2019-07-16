const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const AssetsPlugin = require('./webpack-assets-plugin');
//const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
    entry: {
        vendor: ['./src/lib/es6-polyfill', 'axios', './src/lib/fastclick', 'vue'],
        main: ['./src/util/url.js', './src/util/ajax.js', './src/client-main.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new CommonsChunkPlugin({names: ['vendor'], minChunks: Infinity}),
        new CommonsChunkPlugin({name: 'manifest'}),
        new VueSSRClientPlugin(),
        new AssetsPlugin()
    ]
})

module.exports = config


















