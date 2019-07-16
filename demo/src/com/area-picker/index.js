/**
 * 省市区选择组件
 * 此组件只能在浏览器端进行初始化
 */
 
import Picker from 'com/picker'
import data from './data'

function mapList(list)
{
    return list.map(item => typeof item == 'string' ? { text: item, value: item } : { text: item.name, value: item.name });
}
    
function getIndex(list, itemName)
{
    const index = list.findIndex(item => item.value.includes(itemName));
    return index == -1 ? 0 : index;
}   

export default class CityPicker extends Picker
{
    // value 为英文分号分割的省市区字符串，可不传
    // title 为 picker 的标题，可不传
    constructor(value = '', title)
    {
        const [ provinceName, cityName, areaName ] = value.split(';');
        const provinces = mapList(data);
        const provinceIndex = getIndex(provinces, provinceName);
        const _cities = data[provinceIndex].city;
        const cities = mapList(_cities);
        const cityIndex = getIndex(cities, cityName);
        const areas = mapList(_cities[cityIndex].area);
        const areaIndex = getIndex(areas, areaName);
        
        super({
            data: [provinces, cities, areas],
            selectedIndex: [provinceIndex, cityIndex, areaIndex],
            title
        });
        
        // 最终选择的值，英文分号分割的省市区字符串
        this.value = provinces[provinceIndex] + ';' + cities[cityIndex] + areas[areaIndex];
        // 选择的省市区
        this.text = this.value.replace(/;/g, '');
        
        this._provinceIndex = provinceIndex;
        
        this.on('scrollend', (columnIndex, itemIndex) =>
        {
            if (columnIndex == 0) {
                this._provinceIndex = itemIndex;
                this._onProvinceChange(itemIndex);
            } else if (columnIndex == 1) {
                this._onCityChange(itemIndex);
            }
        });
        
        this.on('change', selectedValues =>
        {
            this.value = selectedValues.join(';');
            this.text = selectedValues.join('');
        });
    }
    
    _onProvinceChange(provinceIndex)
    {
        const _cities = data[provinceIndex].city;
        const cities = mapList(_cities);
        const areas = mapList(_cities[0].area);
        this.refillColumn(1, cities);
        this.refillColumn(2, areas);
        this.scrollColumn(1, 0);
        this.scrollColumn(2, 0);
    }
    
    _onCityChange(cityIndex)
    {
        const _cities = data[this._provinceIndex].city;
        const areas = mapList(_cities[cityIndex].area);
        this.refillColumn(2, areas);
        this.scrollColumn(2, 0);
    }
}