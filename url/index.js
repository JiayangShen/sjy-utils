    
    export function isUrlInfo(urlInfo)
    {
        if(!urlInfo || typeof urlInfo != 'object') return false;
        
        return ['protocol', 'hostname', 'href', 'pathname', 'search', 'hash'].every(function(item){ return item in urlInfo; });
    }
    
    export function getUrlInfo(url)
    {
        url = url || document.location;
        var urlInfo = null;
        if(typeof url == 'string') {
            urlInfo = document.createElement('a');
            urlInfo.setAttribute('href', url);
        } else if(isUrlInfo(url)) {
            urlInfo = url;
        }
        
        return urlInfo;
    }
    
    export function getUrlArgs(url)
    {
        var urlInfo = getUrlInfo(url);
        var args = {};
        if(!urlInfo) return args;
        var match = null;
        var search = urlInfo.search.slice(1);
        var reg = /(?:([^&]+)=([^&]+))/g;
        while((match = reg.exec(search))!==null){
            args[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return args;
    }
    
    export function addUrlArgs(url, key, val)
    {
        var urlInfo = getUrlInfo(url);
        var args = getUrlArgs(urlInfo);
        if(args[key] || (val !== 0 && !val)) return urlInfo;
        
        var search = urlInfo.search;
        var pefix = search[0] == '?' ? '&' : '';
        
        urlInfo.search += pefix + encodeURIComponent(key) + '=' + encodeURIComponent(val);
        
        return urlInfo;
    }
    
    export function param(args)
    {
        if(!args) return '';
        let arr = [];
        for(let key in args) {
            let val = args[key];
            arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val == null ? '' : val));
        }
        return arr.join('&');
    }