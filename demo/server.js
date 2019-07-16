const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const Url = require('url')
const os = require('os')
//const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'
const hostname = os.hostname();

const app = express()

const log = console.log;
const log4js = require('log4js');
var loggerFlag = false;
var appenders = [];

const template = fs.readFileSync(resolve('./src/index.html'), 'utf-8')

function createRenderer (bundle, options)
{
    return createBundleRenderer(bundle, Object.assign(options, {
        template,
        inject: false,
        // for component caching
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: './',
        // recommended for performance
        runInNewContext: false
    }))
}

let renderer, assets;
let readyPromise;
if (isProd) {
    const bundle = require('./webroot/vue-ssr-server-bundle.json')
    const clientManifest = require('./webroot/vue-ssr-client-manifest.json')
    assets = require('./webroot/assets.json')
    renderer = createRenderer(bundle, {clientManifest})
} else {
    // in development: setup the dev server with watch and hot-reload,
    // and update renderer / index HTML on file change.
    readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
        assets = options.assets
        renderer = createRenderer(bundle, options)
    })
}

function render (req, res)
{
    //console.log(req.headers)
    //console.log(req.ip)
    //console.log(req.cookies)
    //console.log(req.get('cookie'))
    //console.log(req.get('referer'))
    //res.sendFile(resolve('../webroot/index.html'));
    //return;
    
    var s = Date.now()
    
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    var parsedUrl = Url.parse(fullUrl)
    var urlInfo = {};
    var urlParts = ['href', 'protocol', 'host', 'hostname', 'pathname', 'port', 'search'];
    for(let key of urlParts) urlInfo[key] = parsedUrl[key];
    urlInfo.origin = urlInfo.protocol + '//' + urlInfo.host;
    urlInfo.search = urlInfo.search || '';
    urlInfo.hash = '';
    
    const env = urlInfo.host.replace(/^(local|mu|dohko|m)\..*/g, '$1');
    
    if(!loggerFlag)
    {
        appenders = [{
            type: 'logLevelFilter',
            level: env == 'm' ? 'ERROR' : 'DEBUG',
            appender: {
                type: 'dateFile',
                filename: env == 'm' || env == 'dohko' ? `../logs/hualala-client-touch/logs/server-${hostname}` : `./logs/server-${hostname}`,
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
                maxLogSize: 1001024,
                backups: 3
            }
        }];
        
        if(env != 'm') appenders.push({type: 'console'});
        log4js.configure({
            appenders: appenders,
            replaceConsole: env == 'm'
        });
        loggerFlag = true;
    }
    
    const logger = log4js.getLogger(env);
    
    res.set('Cache-Control', 'no-store');
    
    const title = ''
    const context = { title, req, urlInfo, assets }
    renderer.renderToString(context, (err, html) =>
    {
        if(err)
        {
            if (err && err.code === 404) {
                res.status(404).end('404 | Page Not Found')
            } else {
                // Render Error Page or Redirect
                res.status(500).end('500 | Internal Server Error')
                logger.error(err)
            }
            return;
        }
        
        res.send(html)
        logger.debug(`whole request: ${Date.now() - s}ms`)
        
    })
    
}

app.disable('x-powered-by');
app.disable('etag');
//app.use(compression({ threshold: 0 }));

app.use('/js', express.static(resolve('./webroot/js')));
app.use('/css', express.static(resolve('./webroot/css')));
app.use('/img', express.static(resolve('./webroot/img')));
//app.use(favicon(resolve('./src/assets/logo.png')))

app.get('*', (req, res) =>
{
    if(req.originalUrl.indexOf('/health') == 0) res.end('200 OK');
    else if(isProd) render(req, res);
    else readyPromise.then(() => render(req, res));
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    log(`server started at localhost:${port}`)
})

















