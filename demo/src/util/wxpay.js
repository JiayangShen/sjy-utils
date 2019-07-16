import wx from 'lib/wx';

export default function wxPay(props)
{
    return new Promise((resolve, reject) =>
    {
        wx.config({
            debug: !!props.debug, 
            appId: props.appId,
            timestamp: props.timeStamp,
            nonceStr: props.nonceStr,
            signature: props.signature,
            jsApiList: ['chooseWXPay']
        });
        wx.ready(function()
        {
            wx.chooseWXPay({
                timestamp: props.timeStamp,
                nonceStr: props.nonceStr,
                "package": props["package"],
                signType: props.signType || 'MD5',
                paySign: props.paySign, // 支付签名
                success: resolve,
                fail: function(err) {
                    err.msg = '微信支付失败，请稍后再试，或选择其它支付方式。<br>' + err.errMsg;
                    reject(err);
                },
                cancel: err => reject({cancel: true})
            });
        });
    });
}
















