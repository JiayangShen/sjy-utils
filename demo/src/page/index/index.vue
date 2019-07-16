<template>
    <div class="page">
        <div class="dib logo"></div>
        <h1>{{ msg }}</h1>
        <h2>首页</h2>
        <ul>
            <li><a href="/shop/home.htm?i=77878&g=5">店铺首页</a></li>
            <li><a href="/shop/menu.htm?i=77878&g=5">店铺菜单</a></li>
            <li><a href="/mall/home.htm?i=77878&g=5">商城首页</a></li>
            <li><a href="/mall/list.htm?c=5523&i=77878&g=5">商品分类</a></li>
            <li><a href="/mall/user.htm?i=77878&g=5">我的</a></li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
            <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
            <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
        </ul>
        
        <button @click="showModal = !showModal">Show Modal</button>
        
        <confirm v-if="showModal" @close="showModal = false">{{msg}}</confirm>
      
    </div>
</template>

<script>

import Spin from 'com/spin'
import session from 'util/session'
import storage from 'util/storage'
import Alert from 'com/alert'
import Confirm from 'com/confirm'
import Tip from 'com/tip'

export default {
    title: '首页',
    preload ()
    {
        //var imgdir = 'img/mall/footer/';
        //(new Image()).src = require(imgdir + 'home-active.svg')
        //(new Image()).src = require('img/mall/footer/home-active.svg')
    },
    data ()
    {
        return {
            msg: '哗啦啦触屏版',
            showLoading: false,
            showModal: false
        }
    },
    components: { Spin, Alert, Confirm, Tip },
    created ()
    {
        //console.log(this.$options.context === options.context)
        //console.log(this.$options)
        //console.log(options)
        /*G.ajax({url: '/'},  this.$options.context)
        .then(console.log)
        .catch(console.log)*/
    },
    methods:
    {
        toggleLoading ()
        {
            this.showLoading = !this.showLoading
        },
        onAlertOk ()
        {
            console.log(this.msg)
        }
    }
}

</script>

<style>

</style>

<style scoped>
:root {
--c: #fff;
--bgc: #222e;
--highlightColor: hwb(190, 35%, 20%);
--imgdir: ~img/;
}

.page {
  font-size: 16px;
  background: var(--bgc); color: var(--c);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  padding-top: 60px;
}

a { color: #42b983; }
a:hover { color: #8f8; }
.df { display: flex; }
.logo { width: 120px; height: 120px; background: url(~img/logo.png); background-size: contain; }

h1, h2 {
  font-weight: normal;
}
h1 { margin: .67em 0 }
h2 { margin: .83em 0 }

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.dialog { color: #000; }
</style>
