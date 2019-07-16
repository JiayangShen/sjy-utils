// binding to window is necessary to make hot reload work in IE in strict mode
const raf = typeof window != 'undefined' && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout

// 用于动态添加的元素异步操作，比如通过改变 CSS 类名触发 transition 动画
export default function nextFrame (fn)
{
    raf(() =>
    {
        raf(fn)
    })
}