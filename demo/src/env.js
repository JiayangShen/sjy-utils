import proto from 'util/proto'
import Vue from 'vue'
import ajax from 'util/ajax'
import log4js from 'log4js'
import filters from './filter'

global.Vue = Vue
global.G = { ajax, info: function() {} }

const vueLogger = log4js.getLogger('VUE');
Vue.config.errorHandler = function (err, vm)
{
    err.vueInstance = vm;
    vueLogger.error(err);
}
















