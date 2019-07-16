const uniq = require('lodash.uniq')

const isJS = file => /\.js(\?[^.]+)?$/.test(file)
const isCSS = file => /\.css(\?[^.]+)?$/.test(file)

function WebpackAssetsPlugin(options = {})
{
    this.options = Object.assign({
        regx: /^\.\/src\/page\/(.+)\/index\.vue/,
        filename: 'assets.json'
    }, options)
}

WebpackAssetsPlugin.prototype.apply = function(compiler)
{
    compiler.plugin('emit', (compilation, cb) =>
    {
        const stats = compilation.getStats().toJson()
        
        const allFiles = uniq(stats.assets
            .map(a => a.name))
        
        const initialFiles = uniq(Object.keys(stats.entrypoints)
            .map(name => stats.entrypoints[name].assets)
            .reduce((assets, all) => all.concat(assets), []))
            
        const initialScripts = initialFiles.filter(isJS)
        const initialStyles = initialFiles.filter(isCSS)
        
        const asyncFiles = allFiles
            .filter(isJS)
            .filter(file => initialFiles.indexOf(file) < 0)
        
        const chunks = stats.chunks.filter(c => !c.entry && !c.initial)
            .map(chunk =>
            {
                const { id, size, files, hash, modules } = chunk;
                const file = files[0];
                const name = modules[0].name;
                const matches = name.match(this.options.regx) || [];
                const [src = '', path = ''] = matches;
                return {id, size, file, name, hash, src, path};
            })
        
        const assets = stats.modules.filter(m => m.assets.length)
            .map(m => ({src: m.name, file: m.assets[0], size: stats.assets.find(f => f.name == m.assets[0]).size}))
        
        const manifest = {
            publicPath: stats.publicPath,
            all: allFiles,
            JS: initialScripts,
            CSS: initialStyles,
            async: asyncFiles,
            chunks,
            assets
        }
        
        const json = JSON.stringify(manifest, null, 4)
        compilation.assets[this.options.filename] = {
            source: () => json,
            size: () => json.length
        }
        cb()
    })
}

module.exports = WebpackAssetsPlugin;















