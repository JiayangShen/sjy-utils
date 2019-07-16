/**
 * Picker 组件
 * 此组件只能在浏览器端进行初始化
 */

import Observable from 'module/observable'

export default class Picker extends Observable
{
    constructor(options)
    {
        super();
        
        this._picker = import('lib/picker').then(_Picker =>
        {
            const picker = new _Picker(options);
            
            picker.on('picker.valuechange', (selectedVals, selectedIndexes) => {
                this.emit('change', selectedVals, selectedIndexes)
            });
            
            picker.on('picker.select', (selectedVals, selectedIndexes) => {
                this.emit('select', selectedVals, selectedIndexes)
            });
            
            picker.on('picker.change', (index, selectedIndex) => {
                this.emit('scrollend', index, selectedIndex)
            });
            
            picker.on('picker.cancel', () => {
                this.emit('cancel')
            });
            
            return picker;
        });
    }
    
    show(next)
    {
        this._picker.then(picker => picker.show(next));
    }
    
    hide()
    {
        this._picker.then(picker => picker.hide());
    }
    
    refill(datas)
    {
        this._picker.then(picker => picker.refill(datas));
    }
    
    refillColumn(index, data)
    {
        this._picker.then(picker => picker.refillColumn(index, data));
    }
    
    scrollColumn(index, dist)
    {
        this._picker.then(picker => picker.scrollColumn(index, dist));
    }
}