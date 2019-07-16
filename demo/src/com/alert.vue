<template>
	<modal :class="{'modal-alert': true}">
        <main class="box w p20 lh15 c-g bg-w"><div class="dib tl"><slot></slot></div></main>
        <footer class="p15 bdt-d f-m bg-w tap-gray ok" @click="$emit('ok')">知道了</footer>
    </modal>
</template>

<script>

import Modal from 'com/modal'

export default {
    components: {Modal}
}

</script>

















