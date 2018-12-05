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
    <s-panel title="Position 定位">
      <h3>Top</h3>
      <s-tab position="top">
        <s-tab-item label="ONE">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>
      <h3>Right</h3>
      <s-tab position="right">
        <s-tab-item label="ONE">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>
      <h3>Bottom</h3>
      <s-tab position="bottom">
        <s-tab-item label="ONE">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>
      <h3>Left</h3>
      <s-tab position="left">
        <s-tab-item label="ONE">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>
    </s-panel>
    <s-panel title="Icon 图标">
      <s-tab class="tab-wrap">
        <s-tab-item
          label="ONE "
          icon="success">ONE</s-tab-item>
        <s-tab-item
          label="TWO "
          icon="info">TWO</s-tab-item>
        <s-tab-item
          icon="danger">TWO</s-tab-item>
      </s-tab>
    </s-panel>
    <s-panel title="Align 排列">
      <h3>Start</h3>
      <s-tab
        justify="start"
        class="tab-wrap">
        <s-tab-item label="ONE ">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>

      <h3>Center</h3>
      <s-tab
        justify="center"
        class="tab-wrap">
        <s-tab-item label="ONE ">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>

      <h3>End</h3>
      <s-tab
        justify="end"
        class="tab-wrap">
        <s-tab-item label="ONE ">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>

      <h3>Around</h3>
      <s-tab
        justify="around"
        class="tab-wrap">
        <s-tab-item label="ONE ">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>

      <h3>Between</h3>
      <s-tab
        justify="between"
        class="tab-wrap">
        <s-tab-item label="ONE ">ONE</s-tab-item>
        <s-tab-item label="TWO">TWO</s-tab-item>
        <s-tab-item label="THREE">THREE</s-tab-item>
      </s-tab>

      <h3>Evenly</h3>
      <s-tab
        justify="evenly"
        class="tab-wrap">
        <s-tab-item label="ONE ">ONE</s-tab-item>
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
