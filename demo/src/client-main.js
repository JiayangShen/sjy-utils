import FastClick from './lib/fastclick'
import styles from './css/main.css'
import Vue from 'vue'
import proto from 'util/proto'
import Url from 'util/url'
import info from 'com/info'
import ajax from 'util/ajax'
import filters from './filter'
import errPage from 'page/error'

const win = window;
const doc = document;
const html = document.documentElement;
const body = doc.body;
const loc = doc.location;
const ua = navigator.userAgent;
const env = loc.host.replace(/^(mu|dohko|m)\..*/g, '$1');

FastClick.attach(body);

// HTTPS 方式调用百度地图 API 所需
if(loc.protocol == 'https:') window.HOST_TYPE = "2";

win.Vue = Vue;
win.G = {
    ajax,
    info,
    isClient: true,
    isIOS: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua),
    isWeixin: ua.indexOf('MicroMessenger') >= 0,
    isAlipay: ua.indexOf('AlipayClient') >= 0,
    dpr: win.devicePixelRatio || 2,
    entryUrl: loc.href,
    setTitle: setTitle
};

if(loc.search.indexOf('debug=true') > 0)
{
    window.onerror = function(err)
    {
        window._alert(JSON.stringify(arguments));
        return false;
    }
    
    Vue.config.errorHandler = function (err, vm, info)
    {
        console.error(err);
        console.error(vm);
        console.error(info);
        alert(err + '\n' + err.stack);
    }
}

const states = win.__INITIAL_STATE__ || {};
G.groupInfo = states.groupInfo || {};
G.userInfo = states.userInfo || {};
const pageData = states.pageData || {};

const $pageStyles = doc.head.querySelector('#pageStyles');

let url = '', vm = null;

function route(url, isReplace)
{
    if(isReplace) loc.replace(url);
    else loc.href = url;
}

// 需要完整刷新的页面，解决微信中调用 JS SDK 调用等问题
const reloadPages =
[
    'receipt/detail'
];
const isNeedReload = path => path.startsWith('order/pay-') || reloadPages.some(p => (new RegExp(p + '$')).test(path));

/**
 * 路由方法
 * @param {String | Object} u, URL 字符串、<a> 元素、location 对象
 * @param {Boolean | Object} isReplace | params, 是否使用 history.replaceState 替换当前页面 URL, 或者页面参数
 * @param {Boolean} isReplace, 是否使用 history.replaceState 替换当前页面 URL
 * @property {String | undefined} preUrl, 前一个页面的 URL
*/
G.route = function(u, params, isReplace)
{
    const _url = G.route.preUrl = url;
    
    // 在 URL 后添加参数
    const paramStr = typeof params == 'object' ? Url.param(params) : '';
    if(typeof u == 'string' && paramStr) {
        u += (/\?$/.test(u) ? '' : /\?.+$/.test(u) ? '&' : '?') + paramStr;
    }
    
    const urlInfo = Url.getUrlInfo(u);
    if(!urlInfo) return;
    
    const path = urlInfo.pathname.replace(/^\/|\/$/g, '').replace(/(\.htm).*$/, '') || 'index';
    isReplace = params === true || isReplace;
    
    if (urlInfo.origin !== loc.origin || (!/\.htm.*\/?$/.test(urlInfo.pathname) && _url))
    {
        route(urlInfo.href, isReplace);
        return;
    }
    
    const args = Url.getUrlArgs(loc.search);
    
    if (urlInfo !== loc)
    {
        Url.addUrlArgs(urlInfo, 'g', args.g);
        Url.addUrlArgs(urlInfo, 'mpid', args.mpid);
        Url.addUrlArgs(urlInfo, '_openid', args._openid);
        Url.addUrlArgs(urlInfo, 'debug', args.debug);
    }
    
    const needReload = G.isWeixin && isNeedReload(path);
    // 不在本项目中的页面
    const isOutPage = !/^((mall|receipt|corder|buy)\/|order\/pay-).+/.test(path);
    
    if(_url && (isOutPage || needReload)) {
        route(urlInfo.href, isReplace);
        return;
    }
    
    url = urlInfo.pathname + urlInfo.search;
    
    if(urlInfo != loc) history[isReplace ? 'replaceState' : 'pushState'](url, '', urlInfo.href);
    
    if(vm) {
        vm.$el.classList.add('out');
        vm.$destroy();
    }
    
    const urlParts = ['href', 'protocol', 'origin', 'host', 'hostname', 'pathname', 'port', 'search', 'hash'];
    const context = Object.assign({isInitial: !_url, query: Url.getUrlArgs(urlInfo)}, urlInfo.pick(urlParts), G);
    
    import('./page/' + path + '/index')
    .then(_page =>
    {
        if(context.href != loc.href) return;
        
        _page = _page.default || _page;
        const page = Object.assign({}, _page);
        const title = page.title;
        page.name = 'page-' + path.replace(/\//g, '-');
        page.context = context;
        
        if(_url)
        {
            if(vm) {
                html.removeAttribute(vm.$options._scopeId);
                html.classList.remove(vm.$options.name);
            }
            html.setAttribute(page._scopeId, '');
            html.classList.add(page.name);
            $pageStyles.textContent = page.styles || '';
            body.scrollTop = 0;
            body.innerHTML = '<div class="page"></div>';
            setTitle(title);
        }
        else
        {
            addFirstPageClass(page);
        }
        
        vm = new Vue(page);
        
        if(!_url && !states.isTimeout) Object.assign(vm, pageData);
        else if(vm.getData) vm.getData(context)
        .then(()=>
        {
            const _title = vm.$options.title;
            if(_title && _title != title) setTitle(_title);
        });
        
        vm.$mount('.page');
    })
    .catch(err =>
    {
        if(context.href != loc.href) return;
        
        if(vm) {
            html.removeAttribute(vm.$options._scopeId);
            html.classList.remove(vm.$options.name);
        }
        $pageStyles.textContent = '';
        console.error(err);
        
        const msg = err.message;
        const is404 = msg.startsWith('Cannot find module');
        const title = is404 ? '404' : err.name;
        const vmError = new Vue(errPage);
        
        vmError.title = title;
        vmError.url = context.href;
        vmError.err = is404 ? '' : (G.isIOS ? err + '\n' : '') + err.stack;
        
        body.innerHTML = '<div class="page"></div>';
        vmError.$mount('.page');
        setTitle(title);
    });
};

// 统一登录页面
G.route.toLogin = (params, isReplace) =>
{
    isReplace = params === true || isReplace;
    params = typeof params == 'object' && params ? params : { f: loc.href };
    if(!params.f) params.f = loc.href;
    G.route('/user/quickLogin.htm', params, isReplace);
}

function setTitle(title)
{
    doc.title = title || '';
    if(!G.isIOS || !G.isWeixin) return;
    let id = '__iframe__'
    let iframe = document.getElementById(id)
    if (!iframe) {
        iframe = document.createElement('iframe')
        iframe.src = '/favicon.ico' // 这个界面比较小
        iframe.width = 0
        iframe.height = 0
        iframe.frameBorder = 0
        iframe.scrolling = 'no'
        iframe.id = id
        iframe.setAttribute('style', 'display: none')
        document.body.appendChild(iframe)
    } else {
        iframe.src = iframe.src
    }
}

function addFirstPageClass(page)
{
    const _render = page.render || function(){};
    page.render = function()
    {
        const vnode = _render.call(this) || {};
        const data = vnode.data = vnode.data || {};
        data.staticClass = (data.staticClass || '') + ' -page-client-init';
        return vnode;
    }
    
    return page;
}

function getAnchor(el)
{
    var node = el;
    while(node && node != body)
    {
        if(node.tagName.toLowerCase() == 'a' && node.getAttribute('href')) return node;
        node = node.parentNode;
    }
    
    return null;
}

body.addEventListener('click', function(e)
{
    var anchor = getAnchor(e.target);
    if(!anchor) return;
    e.preventDefault();
    G.route(anchor);
}, true);

// 解决 iOS 上后退缓存页面的问题
win.onpageshow = function(e)
{
    if (e.persisted) loc.reload();
};

win.addEventListener('popstate', function(e)
{
    if(url && loc.pathname + loc.search !== url) G.route();
});

if(!G.isWeixin) {
    if(env == 'm' || !states.isError) G.route();
    else url = loc.pathname + loc.search;
} else {
    const _mpid = localStorage.getItem('sys_mpid');
    const mpid = Url.getUrlArgs(loc).mpid || '';
    if(mpid != _mpid) {
        localStorage.setItem('sys_mpid', mpid);
        url = loc.pathname + loc.search;
        G.route.toLogin();
    } else {
        if(env == 'm' || !states.isError) G.route();
        else url = loc.pathname + loc.search;
    }
}















