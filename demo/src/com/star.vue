<template>
	<div class="dib ofh star-level-bg">
        <div class="h100 star-level" :style="{ width: value + 'px' }"></div>
    </div>
</template>

<style scoped>
.star-level-bg
{ height: 14px; width: 100px;
  background: url(~img/star/star-gray.png) repeat-x; background-size: 20px 14px;
}
.star-level { background: url(~img/star/star.png) repeat-x; background-size: 20px 14px }
</style>

<script>

export default {
    props: {
        level: { validator: val => val >= 0 && val <= 5, default: 0 }
    },
    computed:
    {
        value ()
        {
            const [intNum, floatNum] = ('' + (parseFloat(this.level) || 0)).split('.');
            return intNum * 20 + (floatNum ? 14 * ('.' + floatNum) : 0);
        }
    }
}

</script>












