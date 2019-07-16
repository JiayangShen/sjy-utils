var weekDays = ['周日', '周一', '周二', '周三', '周四', '周五','周六'];
export function createDate(timeStr)
{
    var y = timeStr.substr(0, 4),
        m = timeStr.substr(4, 2),
        d = timeStr.substr(6, 2),
        h = timeStr.substr(8, 2) || '00',
        mm = timeStr.substr(10, 2) || '00',
        s = timeStr.substr(12, 2) || '00';
    return new Date(y, m - 1, d, h, mm, s);
}

export function getDetailDate(timeStr)
{
	var y = timeStr.substr(0, 4),
        m = timeStr.substr(4, 2),
        d = timeStr.substr(6, 2),
        h = timeStr.substr(8, 2) || '00',
        mm = timeStr.substr(10, 2) || '00',
        s = timeStr.substr(12, 2) || '00';
    // mm = (mm != 0 ? mm : ('0' + mm));
    var date = new Date(y, m - 1, d, h, mm, s);
    var day = date.getDay();
    return y + '-' + m + '-' + d + ' ( ' + weekDays[day] + ' ) ' + h + ':' + mm;
}