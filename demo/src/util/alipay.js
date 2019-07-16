// payType: 1 常规支付宝支付(默认) | 2 爱农支付宝支付
export default function submitAlipay(payCode, callbackUrl, payType)
{
    payType = payType || 1;
    if(!G.isWeixin)
    {
        if(payType == 1) document.body.innerHTML = payCode;
        else if(payType == 2) location.href = payCode;
        return;
    }
    
    if(payType == 2)
    {
        G.route('/order/pay-bridge.htm?payurl=' + encodeURIComponent(payCode) + '&callbackurl=' + encodeURIComponent(callbackUrl));
        return;
    }
    
    const div = document.createElement('div');
    div.innerHTML = payCode;
    const form = div.querySelector('form');
    const action = form.getAttribute('action');
    const inputs = form.querySelectorAll('input[type=hidden]');
    let args = [];
    for(let i = 0, l = inputs.length; i < l; i++) {
        args.push(inputs[i].name + '=' + inputs[i].value)
    }
    const payUrl = encodeURIComponent(action + '&' + args.join('&'));
    const cbUrl = encodeURIComponent(callbackUrl);
    
    G.route('/order/pay-bridge.htm?payurl=' + payUrl + '&callbackurl=' + cbUrl);
}