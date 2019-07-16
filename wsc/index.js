// wsc, WebSocketClient, 对原生 WebSocket 的封装

import Observable from '../observable/index.js'

export default class WebSocketClient extends Observable
{
    constructor(url, options = {})
    {
        super()
        this._url = url;
        this._mq = [];
        this._options = options;
        this._disposed = false;
        this._onOnline = this.open.bind(this);
        
        this.open();
        
        window.addEventListener('online', this._onOnline);
        
    }
    
    open()
    {
        const options = this._options;
        const debug = options.debug;
        
        if(this._disposed)
        {
            if(debug) console.debug('Disposed!');
            return;
        }
        
        if(!navigator.onLine)
        {
            if(debug) console.debug('Offline!');
            return;
        }
        
        clearTimeout(this._timeID);
        
        this._timeID = null;
        this._userClose = false;
        
        const ws = this._ws = new WebSocket(this._url);
        
        ws.onerror = e => this.emit('error', e);
        
        ws.onmessage = e =>
        {
            let data = e.data;
            try { data = JSON.parse(data) } catch(e) {}
            this.emit('message', data);
        };
        
        ws.onopen = e =>
        {
            if(debug) console.debug('Opened!');
            while(this._mq.length) this.send(this._mq.shift());
            this.emit('open', e);
        };
        
        ws.onclose = e =>
        {
            if(debug) console.debug('Closed!' + ` code: ${e.code}` + (e.reason ? ` reason: ${e.reason}` : ''));
            this.emit('close', e);
            if(!this._userClose)
            {
                if(debug) console.debug('Reopening...')
                this._timeID = setTimeout(() => this.open(), 2500);
            }
        };
    }
    
    send(data)
    {
        if(this._disposed) return;
        
        const ws = this._ws;
        const _data = data && typeof data == 'object' ? JSON.stringify(data) : data;
        
        if(ws.readyState != 1)
        {
            this._mq.push(_data);
            return;
        }
        
        return ws.send(_data);
    }
    
    close(code, reason)
    {
        this._userClose = true;
        return this._ws.close(code, reason);
    }
    
    dispose()
    {
        this._disposed = true;
        window.removeEventListener('online', this._onOnline);
        this.close(3000);
    }
}






















