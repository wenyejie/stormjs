<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/30
 -->
<template>
  <s-layout>
    <s-panel title="Default 默认">
      <s-tab class="tab-wrap">
        <s-tab-item label="ONE">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>
    </s-panel>
    <s-panel title="vertical 垂直">
      <s-tab
        class="tab-wrap"
        direction="vertical">
        <s-tab-item label="ONE">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>
    </s-panel>
  </s-layout>
</template>

<script>
export default {
  name: 'ExampleTab'
}
</script>

<style lang="scss" scoped>
  .tab-wrap {
    /*background-color: #eee;*/
  }
</style>
