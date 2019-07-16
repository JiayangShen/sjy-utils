/**
 * 格式化形如“201706251735”日期时间字符串为日期时间格式，
 * 默认格式为 2017.06.25 17:35
 * @param {String} timeStr 要格式化的日期字符串
 * @param {Number} len 要从日期时间字符串截取的长度
 * @param {String} 日期部分的分隔符，默认 .
 * @return {String} 
 */
export function formatTime(timeStr, len, sp)
{
    var s = len ? timeStr.slice(0, len) : timeStr;
    sp = sp || '.';
    s = s.replace(/(\d{4})(\d{2})(\d{2})((\d{2})(\d{2})(\d{2})?)?/, '$1'+ sp +'$2'+ sp +'$3 $5:$6:$7')
        .replace(/\s?(\:+)?$/, '');
    return s;
}

// 从形如“201706251735”的日期时间字符串产生 Date 对象
export function createDate(timeStr)
{
    var y = +timeStr.substr(0, 4),
        m = timeStr.substr(4, 2) - 1,
        d = +timeStr.substr(6, 2),
        h = +timeStr.substr(8, 2) || 0,
        mm = +timeStr.substr(10, 2) || 0,
        s = +timeStr.substr(12, 2) || 0;
    
    return new Date(y, m, d, h, mm, s);
}

export function addDays(date, days = 0)
{
    const _date = new Date(date);
    _date.setDate(_date.getDate() + days);
    
    return _date;
}

/**
 * @param    date      日期对象、时间错、或字符串，如：'8/30/2013'，
 *                     或：new Date(2013, 7, 30)
 * @param    days      要加上或减去的天数，正值加，负值减
 * @param    minutes   要加上或减去的分钟，正值加，负值减
 * @return   Object    一个具有与新的日期信息相关属性的对象
 */
export function calcTime(date, days = 0, minutes = 0, today = new Date())
{
    var dt = new Date(date),
        dayOfMonth = dt.getDate(),
        minuteOfOldDate = dt.getMinutes();
    
    days && dt.setDate(dayOfMonth + days);
    minutes && dt.setMinutes(minuteOfOldDate + minutes);
    
    var y = dt.getFullYear(),
        m = dt.getMonth() + 1,
        d = dt.getDate(),
        h = dt.getHours(),
        mm = dt.getMinutes(),
        wd = dt.getDay();
    
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;
    h = h > 9 ? h : '0' + h;
    mm = mm > 9 ? mm : '0' + mm;
    
    var weekDays = ['周日', '周一', '周二', '周三', '周四', '周五','周六'],
        weekDay = weekDays[wd],
        dateStr = '' + y + m + d,
        timeStr = '' + h + mm,
        dateUI = `${+m}月${+d}日`,
        _date = new Date(y, m - 1, d),
        _dateVal = +_date;
    
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    let dayUI = weekDay;
    if(+today == _dateVal) {
        dayUI = '今天';
    } else if (+addDays(today, 1) == _dateVal) {
        dayUI = '明天';
    } else if (+addDays(today, 2) == _dateVal) {
        dayUI = '后天';
    }
    
    var timeInfo = {
            year: y,
            month: m,
            day: d,
            hour: h,
            minute: mm,
            dateTime: dt,
            date: dt,
            dateStr: dateStr,
            timeStr: timeStr,
            dateTimeStr: dateStr + timeStr,
            weekDay: weekDay,
            dayUI: dayUI,
            dateUI: dateUI + `（${dayUI}）`,
            chinaDate: y + '年' + m + '月' + d + '日',
            chinaTime: h + '时' + mm + '分'
        };
    
    timeInfo.chinaDateTime = timeInfo.chinaDate + ' ' + timeInfo.chinaTime;
    
    return timeInfo;
}














