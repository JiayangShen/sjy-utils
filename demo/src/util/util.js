import wx from 'lib/wx';
// 节流函数。See: http://underscorejs.org/#throttle
export function throttle(func, wait, options)
{
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function()
    {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
    };
    return function()
    {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
//获取调用微信 JS API 时所需配置的参数
export function configWeixinApi(config, apiList, params, url)
{
	var url = url || location.href;
    G.ajax({
		url: 'wechat/jsapi/sign',
		params: { url, mpID: params.mpid || '' }
	}).then(res => {
		var data = res.data || {};
		var _debug = params.debug || false;
		var callback_func, fail_func;
		if(typeof config == 'function'){
            callback_func = config;
        } else if(typeof config == 'object'){
            callback_func = config['callback'];
            fail_func = config['fail'];
        }
        fail_func && (data.fail = fail_func);
		wx.config({
			debug: _debug,
			appId: data.appId,
			timestamp: data.timeStamp, // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名
		    jsApiList: apiList // 必填，需要使用的JS接口列表
		});
		wx.ready(function(){
			callback_func && callback_func(data);
		})
	})
}