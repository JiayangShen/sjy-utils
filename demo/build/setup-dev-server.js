const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {}
}

module.exports = function setupDevServer (app, cb)
{
    let bundle, clientManifest, assets
    let resolve
    const readyPromise = new Promise(r => { resolve = r })
    const ready = (...args) => {
        resolve()
        cb(...args)
    }
    
    clientConfig.entry.main = ['webpack-hot-middleware/client'].concat(clientConfig.entry.main);
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        
        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'))
        assets = JSON.parse(readFile(devMiddleware.fileSystem, 'assets.json'))
        if(bundle) ready(bundle, {clientManifest, assets})
    })
  
    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler))
  
    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length) return
        
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        if (clientManifest && assets) ready(bundle, {clientManifest, assets})
    })
    
    return readyPromise
}



















