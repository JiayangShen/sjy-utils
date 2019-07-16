// 动态加载脚本，主要用于加载第三方绝对 URL 地址的脚本，比如百度地图 JS API

const caches = {} // 已加载结果的缓存

export default function load(url, options)
{
    if(typeof window == 'undefined') return;
    
    const cache = caches[url];
    
    if(cache) return cache;
    
    options = options || {};
    let node = document.createElement('script');
    node.type = options.type || 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;
    
    let promise = new Promise((resolve, reject) =>
    {
        node.onload = resolve;
        node.onerror = reject;
    });
    
    caches[url] = promise;
    
    node.src = url;
    document.head.appendChild(node);
    
    return promise;
}




















