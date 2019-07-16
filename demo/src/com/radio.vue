<template>
    <label>
        <slot name="left"></slot>
        <input class="radio" type="radio" :checked="isChecked" v-bind="$attrs" @change="onChange">
        <i class="box dib vm radio-ui" :class="{ mr8: !!$slots.default }"></i>
        <slot></slot>
    </label>
</template>

<style scoped>
    
@import 'base/var';

.radio { display: none }
.radio-ui
{ width: 20px; height: 20px; padding: 4px;
  border-radius: 50%; border: 1px solid;
  color: var(--c-main); background-color: #fdfdfd;
}

.radio:disabled + .radio-ui { color: var(--c-disabled); }

.radio-ui:after
{ content: ''; display: block;
  box-sizing: border-box; width: 100%; height: 100%;
  border-radius: 50%; transform: scale(0); transition: transform .3s;
}

.radio:checked + .radio-ui:after
{ background-color: currentColor; transform: scale(1); }

</style>

<script>
// 单选按钮
export default {
    name: 'radio',
    inheritAttrs: false,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        value: { default: '' },
        checked: { default: false }
    },
    computed: {
        isChecked()
        {
            return this.checked === this.value;
        }
    },
    methods: {
        onChange(e)
        {
            this.$emit('change', this.value);
        }
    }
}

</script>
