<template>
<div class="box h100 com-keyboard">
    <div class="h100 keyboard-input" :class="{'show-cursor': show}" :placeholder="placeHolder" @click="showKeyboard">{{value}}</div>
    <transition duration="300">
    <div v-show="show" @touchmove.stop @click.self="hideKeyboard" class="posf cover ofh lh1 tc z-max">
        <transition name="slide-up" appear>
        <div v-show="show" class="posa b0 l0 r0 bg-w c keyboard-panel">
            <header class="bg-gray c-w f-m">
                <a class="-bc2 fl" :class="{disabled: !value}" @click="changeValue">清空</a>
                <a class="-bc fr" @click="hideKeyboard">完成</a>
            </header>
            <table class="w100" @click="changeValue">
                <tr><td>1</td><td>2</td><td>3</td></tr>
                <tr><td>4</td><td>5</td><td>6</td></tr>
                <tr><td>7</td><td>8</td><td>9</td></tr>
                <tr><td>.</td><td>0</td><td>←</td></tr>
            </table>
        </div>
        </transition>
    </div>
    </transition>
    
</div>
</template>

<style>
@keyframes com-cursor-blink {
    50% { opacity: 0 }
    to { opacity: 1 }
}
</style>

<style scoped>

.com-keyboard
{
    & .keyboard-input
    {
        &:not(:empty):after, &:empty:before
        {
            content: ''; display: none; width: 2px; height: 1.2em;
            position: relative; top: -3px;
            vertical-align: middle; background-color: #88f;
            animation: com-cursor-blink 1s step-start infinite;
        }
        
        &.show-cursor:after, &.show-cursor:before { display: inline-block }
        
        &:empty:after
        {
            content: attr(placeholder); display: inline-block;
            color: #999; font-size: 18px; vertical-align: top;
        }
    }
    
    & .keyboard-panel { box-shadow: 0 -4px 10px #ddd }
    & header { height: 45px; line-height: 45px; }
    & header a { width: 70px; }
    & table { border-collapse: collapse;  }
    & td
    { width: 1%; padding: 12px 0;
      font-size: 30px;
      border: 1px solid #ddd;
    }
    & td:active { background: #ddd!important }
    & td:nth-child(1) { border-left: none }
    & td:nth-child(3) { border-right: none }
    
    & tr:last-child
    {
        & td { border-bottom: none }
        & td:nth-child(1), & td:nth-child(3) { background: #eee }
    }
    
}

</style>

<script>

export default {
    props: {
        placeHolder: { type: String, default: '' },
        value: { type: String, default: '' },
        show: { type: Boolean, default: false }
    },
    methods: {
        changeValue (e)
        {
            const val = '' + this.value;
            const tar = e.target;
            const txt = tar.textContent;
            const isDel = txt == '←';
            const isClear = txt == '清空';
            
            if(!val && (isDel || isClear)) return;
            
            const newVal = isClear ? '' : isDel ? val.slice(0, -1) : val + txt;
            
            this.$emit('update:value', newVal);
        },
        showKeyboard ()
        {
            this.$emit('update:show', true);
        },
        hideKeyboard ()
        {
            this.$emit('update:show', false);
        }
    }
}

</script>
















