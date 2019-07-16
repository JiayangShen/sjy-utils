<template>
    <label>
        <slot name="left"></slot>
        <input class="checker" :type="type" :checked="isChecked" v-bind="$attrs" @change="onChange">
        <i class="checker-ui" :class="{ mr8: !!$slots.default }"></i>
        <slot></slot>
    </label>
</template>

<script>

export default {
    name: 'checker',
    inheritAttrs: false,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        type: { default: 'radio' },
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
            return this.type == 'radio' ? checked === val :
                Array.isArray(checked) ? checked.indexOf(val) != -1 : checked === this.trueValue
        }
    },
    methods: {
        onChange(e)
        {
            const val = this.value;
            const type = this.type;
            
            if (type == 'radio') {
                this.$emit('change', val);
                return;
            }
            
            if (this.type != 'checkbox') return;
            
            const checked = e.target.checked;
            const model = this.checked;
            const trueValue = this.trueValue;
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
