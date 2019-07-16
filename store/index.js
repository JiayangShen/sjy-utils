const isClient = typeof window != 'undefined';
const _window = isClient ? window : {};

function createStore(store) {
    if (!isClient) return;
    
    return {
        get (key)
        {
            const ret = store.getItem(key);
            
            if (typeof ret != 'string') return ret;
            
            try {
                return JSON.parse(ret);
            } catch(e) {
                return ret;
            }
        },
        
        set (key, val)
        {
            const _val = typeof val == 'object' && val != null ? JSON.stringify(val) : val;
            store.setItem(key, _val);
        },
        
        remove (key)
        {
            store.removeItem(key);
        },
        
        clear ()
        {
            store.clear();
        }
    }
}

export const storage = createStore(_window.localStorage),
             session = createStore(_window.sessionStorage);