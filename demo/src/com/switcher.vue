<template>
    <label>
        <input class="switcher" type="checkbox" :checked="isChecked" v-bind="$attrs" @change="onChange">
        <i class="box dib vm switcher-ui"></i>
    </label>
</template>

<style scoped>

@import 'base/var';

.switcher { display: none }
.switcher-ui
{ width: 44px; height: 22px;
  border-radius: 11px; border: 1px solid;
  color: var(--c-main); background-color: #fdfdfd;
  transition: all .3s;
}

.switcher:checked + .switcher-ui { background-color: currentColor; }
.switcher:disabled + .switcher-ui { color: var(--c-disabled); }

.switcher-ui:after
{ content: ''; display: block;
  width: 20px; height: 20px;
  border-radius: 50%; background-color: #fff;
  box-shadow: 0 1px 3px;
  transition: transform .3s;
}

.switcher:checked + .switcher-ui:after { transform: translate3d(22px, 0, 0); }

</style>

<script>
// 开关
export default {
    name: 'switcher',
    inheritAttrs: false,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        value: { default: '' },
        checked: { default: false },
        trueValue: { default: true },
        falseValue: { default: false }
    },
    computed: {
        isChecked()
        {
            const val = this.value;
            const checked = this.checked;
            return Array.isArray(checked) ? checked.indexOf(val) != -1 : checked === this.trueValue;
        }
    },
    methods: {
        onChange(e)
        {
            const val = this.value;
            const checked = e.target.checked;
            const model = this.checked;
            let ret = checked;
            if (Array.isArray(model)) {
                if(checked) {
                    model.push(val);
                    ret = model;
                } else {
                    ret = model.filter(e => e !== val);
                }
            } else {
                ret = checked ? this.trueValue : this.falseValue;
            }
            
            this.$emit('change', ret);
        }
    }
}

</script>
