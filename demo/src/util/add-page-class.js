// 处理 vue render function 产生的页面 vnode，添加页面对应的类名，
// 类名名称与 URL pathname 对应。
// page 参数是 vue-loader 解析 .vue 文件产生的对象。
export default function addPageClass (page, isInitial)
{
    const _render = page.render || function(){};
    page.render = function()
    {
        const vnode = _render.call(this) || {};
        const data = vnode.data = vnode.data || {};
        let staticClass = data.staticClass || '';
        if(staticClass.indexOf(page.name) < 0) staticClass += (staticClass ? ' ' : '') + page.name;
        if(isInitial) staticClass += ' -page-client-init';
        data.staticClass = staticClass;
        return vnode;
    }
    
    return page;
}
