// 将字符串中的 &,",<,>进行转义
const escapeMap = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'};
export default function escapeHtml(str)
{
    return typeof str == 'number' && isNaN(str) ? '0' : str == null || str == undefined ? '' : (str+'').replace(/[&"<>]/g, c => escapeMap[c]);
}