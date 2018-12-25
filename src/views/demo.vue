<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>
    <s-upload>上传文件</s-upload>

    <s-editor />
  </s-layout>
</template>

<script>
import trimRight from '../filters/trimRight'

export default {
  name: 'VDemo',
  filters: { trimRight },
  data () {
    return {
      demo: '  2121  '
    }
  },
  watch: {
    demo: {
      handler () {

      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
