<template>
  <div class="page p15 f-m" error="500">
    <h2 class="mb">哎呦！～出错啦o(╯□╰)o～～</h2>
    <ul>
      <li>500: Internal Server Error</li>
      <li>URL: {{url}}</li>
      <li>{{errMsg}}</li>
    </ul>
  </div>
</template>

<script>

export default {
    props: {
        url: { type: String, default: ''},
        errMsg: { type: String, default: ''}
    }
}

</script>














