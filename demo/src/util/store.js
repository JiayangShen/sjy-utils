export default store =>
{
    if(!G.isClient || !store) return {};
    
    return {
        get (key)
        {
            var ret = store.getItem(key);
            try {
                return JSON.parse(ret);
            } catch(e) {
                return ret;
            }
        },
        
        set (key, val)
        {
            var val = JSON.stringify(val);
            
            if(store === sessionStorage)
            {
                store.setItem(key, val);
                return;
            }
            
            try {
                store.setItem(key, val);
            }
            catch(e)
            {
                for(var k in store) if(/menu_\d+.*/.test(k)) store.removeItem(k);
                
                store.setItem(key, val);
            }
        },
        
        remove (key) { store.removeItem(key); }
    }
    
}




















