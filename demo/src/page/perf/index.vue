<template>
<div class="p10 f-m page">
    <dl>
        <dt>浏览器信息</dt>
        <dd><b class="b">URL</b>: {{url}}</dd>
        <dd><b class="b">Cookie Enabled</b>: {{cookieEnabled}}</dd>
        <dd><b class="b">User Agent</b>: {{userAgent}}</dd>
    </dl>
    
    <h3>本页面加载时间(/ms)</h3>
    <table class="page-time">
        <tr><th>延时</th><td>{{stall}}</td></tr>
        <tr><th>重定向</th><td>{{redirect}}</td></tr>
        <tr><th>DNS</th><td>{{dns}}</td></tr>
        <tr><th>连接</th><td>{{connection}}</td></tr>
        <tr><th>TTFB</th><td>{{ttfb}}</td></tr>
        <tr><th>下载</th><td>{{download}}</td></tr>
        <tr><th>解析渲染</th><td>{{dom}}</td></tr>
        <tr><th>总计</th><td>{{duration}}</td></tr>
    </table>
    
    <p class="bdt-d pv10 mt10">注：解析渲染时间包含页面内其它资源的下载和解析渲染时间。</p>
    
    <h3>页内资源加载时间(/ms)</h3>
    <table class="entries">
        <tr>
            <!-- <th>开始</th> -->
            <th>延时</th>
            <th>DNS</th>
            <th>连接</th>
            <th>TTFB</th>
            <th>下载</th>
            <th>总计</th>
        </tr>
        <template v-for="entry of entries">
        <tr><td colspan="7" class="noms">{{entry.name}}</td></tr>
        <tr>
            <!-- <td>{{entry.start}}</td> -->
            <td>{{entry.stall}}</td>
            <td>{{entry.dns}}</td>
            <td>{{entry.connection}}</td>
            <td>{{entry.ttfb}}</td>
            <td>{{entry.download}}</td>
            <td>{{entry.duration}}</td>
        </tr>
        </template>
    </table>
    <p v-if="showTip" class="mt15">您的浏览器不支持获取此信息的功能！</p>
    
</div>
</template>

<style scoped>

dt, h3
{ font-size: 18px; font-weight: bold;
  margin: 1em 0 .5em 0; padding-bottom: 6px;
  color: #88e; border-bottom: 1px solid;
}

.page-time { width: auto }
.page-time th { padding-right: 10px; text-align: right; border: none }
.page-time th:after { content: ':' }
.page-time td { text-align: left; border: none }
//td:not(.noms):after { content: 'ms' }

.entries
{ box-sizing: border-box; width: 100%;
  border-collapse: collapse;
}
.entries tr { border-bottom: 1px solid #ddd }
.entries tr:nth-child(2n) { background: #f8f8f8 }
.entries th, .entries td { padding: 6px 4px }
.entries td:not(.noms) { text-align: right; }
.noms { word-break: break-all; }

</style>

<script>

export default {
    title: '资源时间',
    styles: 'html { background-color: #fff }',
    data () {
        return {
            url: '',
            cookieEnabled: '',
            userAgent: '',
            
            stall: '',
            redirect: '',
            dns: '',
            connection: '',
            ttfb: '',
            download: '',
            dom: '',
            duration: '',
            
            entries: [],
            showTip: false
        }
    },
    mounted ()
    {
        this.getPageTime();
        this.getEnties();
        
    },
    methods: {
        getPageTime ()
        {
            const t = performance.timing;
            this.url = location.href;
            this.cookieEnabled = navigator.cookieEnabled;
            this.userAgent = navigator.userAgent;
            
            this.stall = Math.round(t.domainLookupStart - t.navigationStart);
            this.redirect = Math.round(t.redirectEnd - t.redirectStart);
            this.dns = Math.round(t.domainLookupEnd - t.domainLookupStart);
            this.connection = Math.round(t.connectEnd - t.connectStart);
            this.ttfb = Math.round(t.responseStart - t.requestStart);
            this.download = Math.round(t.responseEnd - t.responseStart);
            this.dom = Math.round((t.loadEventEnd || t.domContentLoadedEventEnd) - t.responseEnd);
            this.duration = Math.round((t.loadEventEnd || t.domContentLoadedEventEnd) - t.navigationStart);
            
        },
        getEnties()
        {
            if(!performance.getEntries)
            {
                this.showTip = true;
                return;
            }
            
            /*this.entries = performance.getEntries()
            .filter(t => 'requestStart' in t && !t.name.includes(location.pathname))
            .map(t =>
            ({
                name: t.name,
                start: Math.round(t.startTime),
                stall: t.domainLookupStart ? Math.round(t.domainLookupStart - t.startTime) : '',
                dns: t.domainLookupStart ? Math.round(t.domainLookupEnd - t.domainLookupStart) : '',
                connection: t.connectStart ? Math.round(t.connectEnd - t.connectStart) : '',
                ttfb: t.responseStart ? Math.round(t.responseStart - t.requestStart) : '',
                download: t.responseStart ? Math.round(t.responseEnd - t.responseStart) : '',
                duration: Math.round(t.duration)
            }));*/
            
            const entries = performance.getEntries()
            .filter(t => 'requestStart' in t && !t.name.includes(location.pathname))
            .map(t =>
            {
                return new Promise(resolve =>
                {
                    const img = new Image();
                    img.onload = img.onerror = resolve;
                    img.src = t.name + '?v=' + new Date().getTime();
                })
            });
            
            Promise.all(entries).then(() =>
            {
                this.entries = performance.getEntries().filter(t => t.name.includes('?v='))
                .map(t =>
                ({
                    name: t.name,
                    //start: Math.round(t.startTime),
                    stall: t.domainLookupStart ? Math.round(t.domainLookupStart - t.startTime) : '',
                    dns: t.domainLookupStart ? Math.round(t.domainLookupEnd - t.domainLookupStart) : '',
                    connection: t.connectStart ? Math.round(t.connectEnd - t.connectStart) : '',
                    ttfb: t.responseStart ? Math.round(t.responseStart - t.requestStart) : '',
                    download: t.responseStart ? Math.round(t.responseEnd - t.responseStart) : '',
                    duration: Math.round(t.duration)
                }));
            })
            
        }
    }
}

</script>


















