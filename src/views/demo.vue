<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>
    <s-upload v-model="demo">上传文件</s-upload>
    {{ demo }}
  </s-layout>
</template>

<script>
import trimRight from '../filters/trimRight'

export default {
  name: 'VDemo',
  filters: { trimRight },
  data () {
    return {
      demo: ''
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
