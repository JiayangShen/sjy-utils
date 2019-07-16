<template>
    <div class="page p15 lh f-m tc wrbw">
        <h2 class="pb10 pt20 bdb-d">{{title}}</h2>
        <div class="tc mt10 c-lg">{{url}}</div>
        <div class="tc mt10 bdb c-g">您访问的页面暂时不可用！</div>
        <pre v-if="err" class="mt15 pt10 tl lh bdt-d" style="color: red">{{err}}</pre>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: '',
            url: '',
            err: ''
        }
    }
}

</script>














