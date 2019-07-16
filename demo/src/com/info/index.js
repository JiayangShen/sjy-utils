// 信息提示组件，代替之前的 alert 组件
import Info from './info'

export default function info(content = '', callback, buttonText)
{
    if(!G.isClient) return;
    
    const vmInfo = new Vue(Info).$mount();
    vmInfo.content = content;
    if(buttonText) vmInfo.buttonText = buttonText;
    
    vmInfo.$on('close', ()=> {
        if(callback) callback();
    });
    
    document.body.appendChild(vmInfo.$el);
}