<template>
	<modal :class="{'bg-tran': true, 'modal-spin': true}">
        <div class="pt15 pb15 bg-semi c-w shadow">
			<div class="box dib mb10 spin"></div>
			<div class="f14 tl">{{msg}}</div>
		</div>
    </modal>
</template>

<script>

import Modal from 'com/modal'

export default {
    components: {Modal},
    props: {
        msg: { type: String, default: '载入中，请稍候～～' }
    }
}

</script>

<style scoped>
    
	.shadow { padding: 20px; max-width: 240px; }
	.spin
    { width: 36px; height: 36px;
      margin-left: auto; margin-right: auto;
      border: 4px solid #f4f0ed; border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .spin:before
    { content: ''; box-sizing: border-box;
      display: inline-block; width: 36px; height: 36px;
      margin: -4px 0 0 -4px; vertical-align: top;
      border: 4px solid transparent; border-top-color: #fcb56e;
      border-radius: 50%;
    }
</style>












