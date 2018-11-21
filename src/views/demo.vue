<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>DEMO</s-layout>
</template>

<script>
export default {
  name: 'VDemo',
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
  },
  created () {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
</style>
