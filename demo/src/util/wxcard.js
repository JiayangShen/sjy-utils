import { configWeixinApi } from './util';
import wx from 'lib/wx';

/*
addCard data数据格式；
cardExt 为json数据
data = [{
        cardId: param.cardID,
        cardExt: '{"timestamp":"'+ param.timeStamp + '","nonce_str":"' + param.nonceStr + '","signature":"' + param.signature + '","outer_str":"' + param.outerStr + '","code":"' + param.cardNO +'"}'
    },……]
可多卡
*/
export function addCard(data, params, options = {}){
    return new Promise((resolve, reject) => {
        configWeixinApi(() =>{
            wx.addCard({
                cardList: data,
                success: resolve,
                fail: reject,
                complete: function () {                    
                    options.completeCallback && options.completeCallback();
                },
                cancel:function(){
                    options.cancelCallback && options.cancelCallback();
                }
            });
        },['addCard'], params)
    })
}
/*
openCard  data数据格式：
data = [{
        cardId: param.cardID,
        code: param.wechatCardCode
    },……]
可多卡
*/
export function openCard(data, params, options = {}){
	return new Promise((resolve, reject) => {
       	configWeixinApi(()=>{
            wx.openCard({
                cardList: data,
                success: resolve,
                fail: reject,
                complete: function () {                   
                    options.completeCallback && options.completeCallback();
                },
                cancel:function(){
                    options.cancelCallback && options.cancelCallback();
                }
            });
        },['openCard'], params)
	})
}