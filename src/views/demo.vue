<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>{{ demo | trimRight }}</s-layout>
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
  },
  created () {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
</style>
