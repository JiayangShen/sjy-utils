<template>
	<modal>
        <main class="box w p20 lh15 c-g bg-w"><div class="dib tl"><slot></slot></div></main>
        <footer class="box w bdt-d f-m bg-w">
            <div class="cell p15 tap-gray concel" @click="onConcel">{{concelTitle}}</div>
            <div class="cell p15 bdl-d tap-gray ok" @click="onOk">{{okTitle}}</div>
        </footer>
    </modal>
</template>

<script>

import Modal from 'com/modal'

export default {
    components: {Modal},
    props: {
        okTitle: { type: String, default: '确定' },
        concelTitle: { type: String, default: '取消' }
    },
    methods: {
        onOk () {
            this.$emit('ok')
            this.$emit('close')
        },
        onConcel () {
            this.$emit('concel')
            this.$emit('close')
        }
    }
}

</script>

















