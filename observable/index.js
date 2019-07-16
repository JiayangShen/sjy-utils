const slice = Array.prototype.slice

export default class Observable
{
    constructor()
    {
        // observable event callbacks
        this._oecbs = {}
    }

    /**
     * Listen to the given `event` and
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } this
     */
    on(event, fn)
    {
        if (typeof fn == 'function')
            (this._oecbs[event] = this._oecbs[event] || []).push(fn)
          
        return this
    }

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off(event, fn)
    {
        if (event == '*' && !fn) this._oecbs = {}
        else
        {
            if (fn)
            {
                var arr = this._oecbs[event]
                if(arr) for (var i = 0, l = arr.length; i < l; ++i)
                {
                    var cb = arr[i]
                    if (cb == fn) arr.splice(i--, 1)
                }
            }
            else delete this._oecbs[event]
        }
        return this
    }

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one(event, fn)
    {
        var me = this;
        function on()
        {
            me.off(event, on)
            fn.apply(this, arguments)
        }
        return this.on(event, on)
    }

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    emit(event)
    {
        // getting the arguments
        var arglen = arguments.length - 1,
            args = new Array(arglen),
            fns,
            fn,
            i

        for (i = 0; i < arglen; i++) {
            args[i] = arguments[i + 1] // skip first argument
        }

        fns = slice.call(this._oecbs[event] || [], 0)
        var l = fns.length;
        for (i = 0; i < l; ++i) {
            fns[i].apply(this, args)
        }
        
        if (this._oecbs['*'] && event != '*')
            this.emit.apply(this, ['*', event].concat(args))

        return this
    }

}












