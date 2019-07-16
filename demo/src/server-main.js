import './env'
import log4js from 'log4js'
import errPage from 'page/error'

export default context =>
{
    const req = context.req
    const urlInfo = context.urlInfo
    const assets = context.assets
    const ua = req.headers['user-agent']
    const env = urlInfo.host.replace(/^(local|mu|dohko|m)\..*/g, '$1');
    const logger = log4js.getLogger(env);
    let ctx = {
        isInitial: true,
        query: req.query,
        ip: req.ip,
        cookie: req.get('cookie'),
        referer: urlInfo.href,
        userAgent: ua,
        req: req,
        logger: logger,
        isIOS: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua),
        isWeixin: ua.indexOf('MicroMessenger') >= 0,
        isAlipay: ua.indexOf('AlipayClient') >= 0,
        dpr: 2,
        entryUrl: urlInfo.href
    };
    
    context.pageModule = '';
    context.skinType = '';
    
    ctx = Object.assign(ctx, urlInfo);
    
    let pagePath = urlInfo.pathname.replace(/^\/|\.htm.*$/g, '') || 'index';
    
    const s = Date.now()
    const entry = '/page/' + pagePath + '/index.vue';
    const states = context.state = {};
    
    let _page;
    try
    {
        _page = require('./page/' + pagePath + '/index')
    }
    catch(err)
    {
        context.pageStyles = errPage.styles || '';
        context.pageName = '';
        context.pageScopeId = '';
        states.isError = true;
        
        const msg = err.message;
        const is404 = msg.startsWith('Cannot find module');
        const title = is404 ? '404' : err.name;
        const vmError = new Vue(errPage);
        
        context.title = title;
        vmError.title = title;
        vmError.url = urlInfo.href;
        vmError.err = is404 ? '' : err.stack;
        
        return vmError;
    }
    
    _page = _page.default || _page;
    //console.log(_page)
    const pageOptions = Object.assign({}, _page);
    
    pageOptions.name = 'page-' + pagePath.replace(/\//g, '-');
    pageOptions.context = ctx;
    
    context.title = pageOptions.title || '';
    context.pageName = pageOptions.name;
    context.pageStyles = pageOptions.styles || '';
    context.pageScopeId = pageOptions._scopeId || ''
    
    const file = (assets.chunks.find(c => c.path == pagePath) || {}).file || '';
    if(file) {
        context.pageModule = `<script src="/${file}" defer></script>`;
    }
    
    pageOptions.ssrContext = context;
    const beforeCreate = pageOptions.beforeCreate;
    if(beforeCreate && beforeCreate.length)
    {
        const index = beforeCreate.length - 1;
        const _hook = beforeCreate[index];
        beforeCreate[index] = function hook(ssrContext) {
            return _hook.call(this, ssrContext || context)
        }
    }
    
    const page = new Vue(pageOptions);

    const groupID = req.query.g;
    const promises = [];
    //集团参数获取
    if (groupID) {
        const getParamsPromise = G.ajax({ url: 'selectSysParams', params: { groupID } }, ctx)
        .then(res => {
            if(env != 'm') logger.debug(`getGroupParams pre-fetch: ${Date.now() - s}ms`);
            const groupData = res.data || {};
            const records = groupData.records || [];
            const groupParams = {};
            records.forEach((record) => {
                groupParams[record.paramName] = record.paramValues;
            });
            context.skinType = groupParams.wechatDerma || '';
            return groupParams;
        })
        .catch(err => {
            const msg = err && err.message;
            if(env != 'm') logger.debug(`getGroupParams pre-fetch failed: ${Date.now() - s}ms`)
            logger.error(urlInfo.href + ` getGroupParams failed: ${msg || ''}`);
            return err;
        });
        promises.push(getParamsPromise);
    } 
    //页面数据获取
    if (page.getData) {
        const getDataPromise = page.getData(ctx);
        if(!getDataPromise || !getDataPromise.then)
        {
            if(env == 'm') return page;
            throw new Error(entry + '的 getData() 方法必须返回一个 Promise 对象！')
        }
        getDataPromise
        .then(pageData => {
            if(env != 'm') logger.debug(`data pre-fetch: ${Date.now() - s}ms`);
            if(pageData) states.pageData = pageData;
            context.title = page.$options.title || '';
            return pageData;
        })
        .catch(err => {
            const msg = err && err.message;
            if(env != 'm') logger.debug(`getPageData pre-fetch failed: ${Date.now() - s}ms`)
            logger.error(urlInfo.href + ` getPageData failed: ${msg || ''}`);
            return err;
        });
        promises.push(getDataPromise);
    }
    
    return new Promise((resolve, reject) =>
    {
        let isTimeout = false;
        setTimeout(()=>
        {
            if(isTimeout) return;
            isTimeout = true;
            if(env != 'm') logger.debug(`data pre-fetch timeout: ${Date.now() - s}ms`)
            states.isTimeout = isTimeout;
            resolve(page);
        }, 3000);
        
        const callback = function() {
            if(isTimeout) return;
            isTimeout = true;
            resolve(page);
        }

        Promise.all(promises).then(callback).catch(callback);
    });
}
