<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>
    <s-input />
    <s-chosen
      placeholder="请选择..."
      v-model="demo"
      multiple>
      <s-chosen-item
        value="one"
        label="ONE">ONE
      </s-chosen-item>
      <s-chosen-item
        value="two"
        label="TWO">TWO
      </s-chosen-item>
      <s-chosen-item
        value="three"
        label="THREE">THREE
      </s-chosen-item>
    </s-chosen>

    <div>value: {{ demo }}</div>
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
