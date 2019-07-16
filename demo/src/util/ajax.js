
import Axios from 'axios'
import Url from 'util/url'
import info from 'com/info'

/*
    cfg: 见 -> https://github.com/mzabriskie/axios
    ctx: 只在 NodeJS 端传递，每个页面的 getData(ctx)
    方法调用时，必须给 send 方法传递 ctx 参数。
*/
export function send(cfg, ctx)
{
    cfg = cfg || {};
    cfg.url = cfg.url || '/';
    
    if(ctx && ctx.query && ctx.query.g && cfg.url.indexOf('g=') < 0)
    {
        cfg.url += (cfg.url.indexOf('?') >= 0 ? '&' : '?') + 'g=' + ctx.query.g;
    }
    
    if(!G.isClient && !ctx && !cfg.baseURL)
    {
        throw new Error('NodeJS 中调用 ajax 方法必须传递第二个参数 ctx，或者第一个参数 cfg 必须指定 baseURL！')
    }
    
    var headers = {};
    var options = {
        //baseURL: 'http://local.m.hualala.com/',
        headers: headers,
        timeout: 35000
    };
    
    if(!G.isClient && ctx && ctx.req)
    {
        if(ctx.origin) options.baseURL = ctx.origin;
        if(ctx.ip) headers.IP = ctx.ip;
        if(ctx.cookie) headers.Cookie = ctx.cookie;
        if(ctx.referer) headers.Referer = ctx.referer;
        if(ctx.userAgent) headers['User-Agent'] = ctx.userAgent;
    }
    
    var axios = Axios.create(options);
    
    if(!G.isClient) return axios.request(cfg)
    .then(res =>
    {
        if(res.data) try { res.data = JSON.parse(JSON.stringify(res.data)) } catch(e) {}
        
        return res;
    })
    .catch(err => 
    {
        if(ctx && ctx.logger)
        {
            var errInfo = {[err.name]: err.message, requestParams: cfg};
            errInfo = errInfo.pick(ctx, 'origin', 'referer', 'cookie', 'userAgent');
            ctx.logger.error(errInfo);
        }
        err.isError = true;
        return err;
    });
    
    var href = location.href;
    var query = Url.getUrlArgs();
    if(cfg.url.indexOf('g=') < 0 && query.g)
    {
        cfg.url += (cfg.url.indexOf('?') >= 0 ? '&' : '?') + 'g=' + query.g;
    }
    
    return new Promise((resolve) =>
    {
        var cb = ret => { if(href == location.href) resolve(ret) };
        
        axios.request(cfg)
        .then(cb)
        .catch(err =>
        {
            console.error(err);
            err.isError = true;
            cb(err);
        })
    });
    
}

/*
    opts = {
        url: 'service',               // 服务调用地址
        api: 'shop_searchShopLucene', // 服务名
        version: '1.1',               // 服务版本
        type: 3,                      // 参数类型（1: properties, 2: records, 3: 自定义）
        data: {                       // 服务调用参数
            page: {pageNo: 1, pageSize: 10},
            records: [{groupID: '5', feature: 'commonreserve_order'}]
        }
    }
*/
export function formPost(opts, ctx)
{
    opts = opts || {};
    var t = opts.type || 1;
    var d = opts.data;
    var pdata = {service: opts.api};
    pdata.data = t == 1 ? {properties: d} : t == 2 ? {records: [d]} : d;
    var cfg = {
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: opts.url || '/service',
        //data: {pdata: pdata, version: opts.version || '1.1'}
        data: 'pdata=' + encodeURIComponent(JSON.stringify(pdata)) + '&version=' + (opts.version || '1.1')
    };
    
    return send(cfg, ctx);
}

export function showError(code, msg, url)
{
    const tips =
    '<h5 class="tc f-m mb6">出错了~请稍后再试</h5>'+
    '<p>' + code + ': ' + msg + '.</p>'+
    '<p class="wbba">In ajax "' + url + '".</p>';
    
    info(tips);
}

/*
    cfg 参数在 send 方法的 cfg 参数基础上增加了三个属性。
    prefix: prefix === false 时 url 不自动以 /api/ 开头。默认 !== false。
    mustLogin: mustLogin == true 时，浏览器环境，未登录将自动显示登录页面。默认 != true 。
    showError：showError == true 时，自动提示错误信息。默认 != true。
    
    返回结果为 Promise 实例，只会有 then 回调。
    then 回调的参数是 http 响应体（res）。
    对于 /api/ 开头的服务，res.code 为错误码，res.msg 为错误消息。
*/

export default function ajax(cfg, ctx)
{
    cfg = cfg || {};
    cfg.url = (cfg.prefix !== false ? '/api/' : '') + (cfg.url || '');
    
    return send(cfg, ctx).then(res =>
    {
        const data = res.data || {};
        
        if(data.resultcode && !data.result) {
            data.result = {code: data.resultcode, message: data.resultmsg};
        }
        
        const result = data.result || {};
        res.code = result.code || '';
        res.msg = result.message || result.msg || '';
        
        if(res.isError) {
            res.code = res.name || '';
            res.msg = res.message || '';
        }
        
        if(res.code == '12116401') {
            res.code = '401';
            if(cfg.mustLogin && G.isClient) {
                G.route('/user/quickLogin.htm');
                return;
            }
        }
        
        if(cfg.showError && (res.isError || (cfg.prefix !== false && res.code != '000'))) {
            showError(res.code, res.msg, cfg.url);
        }
        
        return res;
    });
}















