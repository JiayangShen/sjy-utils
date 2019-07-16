<template>
	<modal v-if="opened" class="modal-info">
        <main class="box w p20 lh15 c-g bg-w"><div class="dib tl" v-html="content"></div></main>
        <footer class="p15 bdt-d f-m bg-w c-main tap-gray ok" @click="onClose">{{buttonText}}</footer>
    </modal>
</template>

<script>

import Modal from 'com/modal'

export default {
    components: { Modal },
    data() {
        return {
            opened: true,
            content: '',
            buttonText: '知道了'
        }
    },
    methods: {
        onClose() {
            this.opened = false;
            this.$emit('close');
            setTimeout(()=> this.$destroy(), 300);
        }
    }
}

</script>

















