import load from './load'

// 地图 JS API 地址，这里为百度地图 API
const url = 'https://api.map.baidu.com/getscript?v=2.0&ak=4Z31RZLBekTpa4IuFp2DXkQU&s=1';

// 支持 callback 和 promise 两种回调，回调的参数是地图对象
function ready(callback)
{
    if(!G.isClient) return;
    
    return load(url).then(() =>
    {
        if(callback) callback(window.BMap);
        
        return window.BMap;
    });
}

export default { ready }


















