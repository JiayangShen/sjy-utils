// 此模块用于扩展 Object.prototype
// 扩展 Object.prototype 前请三思而后行！

/*
    深克隆方法。
    请不要在非 JSON 兼容的类型上调用此方法！
*/
Object.prototype.clone = function()
{
    return JSON.parse(JSON.stringify(this));
};
Object.defineProperty(Object.prototype, 'clone', { enumerable: false});

/*
    将一个对象的一些字段复制到另一个对象并返回。
    用法：
    var obj1 = {a: 1}, obj2 = {b: 2};
    var obj3 = obj1.pick('a');             // {a: 1}
    var obj4 = obj2.pick(['a']);           // {a: 1}
    var obj5 = obj3.pick(obj2, 'b')        // {a: 1, b: 2}
    var obj6 = obj4.pick(obj2, ['b'])      // {a: 1, b: 2}
*/
Object.prototype.pick = function(from, props)
{
    var ret = from != null && !Array.isArray(from) && typeof from == 'object' ? this.clone() : {};
    var args = Array.from(arguments);
    var src = !from || typeof from === 'string' || Array.isArray(from) ? this : from;
    var keys = typeof from === 'string' ? args : 
            Array.isArray(from) ? from :
            from && !props ? Object.keys(from) :
            typeof props === 'string' ? args.slice(1) : props;
    
    if(keys) for(let i = 0, l = keys.length; i < l; i++)
    {
        const key = keys[i];
        if(src[key] != null) ret[key] = src[key];
    }
    
    return ret;
};
Object.defineProperty(Object.prototype, 'pick', { enumerable: false});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    