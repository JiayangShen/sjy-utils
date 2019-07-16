<template>
    <transition name="fade" appear
    @after-enter="afterEnter">
    <div v-show="show" class="box posf cover ofa vc lh tc z-max fade tip-wrap">
        <div class="box dib m15 ofh vm bdrs6 f c-w tip"><slot></slot></div>
    </div>
    </transition>
</template>

<script>
var timeid = null;
export default {
    props: {
        show: { type: Boolean, default: false },
        duration: { validator: val => val > 0, default: 2 }
    },
    methods: {
        afterEnter (el)
        {
            clearTimeout(timeid);
            timeid = setTimeout(()=> { this.$emit('appeared'); }, this.duration * 1000);
        }
    }
}

</script>

<style scoped>

.tip-wrap { pointer-events: none }
.tip { max-width: 280px; padding: 12px 24px; background: rgba(71, 71, 72, .85); }

</style>



























