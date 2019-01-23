<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>
    <!--<s-upload>上传</s-upload>-->

    <s-time-picker />

    <s-date-time-picker />

    <dynamic-block>
      <div slot="dragContent">测试拖动大小</div>
    </dynamic-block>
  </s-layout>
</template>

<script>
export default {
  name: 'VDemo',
  data () {
    return {
      demo: []
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
    this.init()
  },
  methods: {
    init () {
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    display: grid;
    width: 320px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    background-color: #fff;
  }

  .item {
    background-color: rgba(200, 194, 0, .75);
    color: #fff;
    text-align: center;
    line-height: 100px;
  }
</style>
