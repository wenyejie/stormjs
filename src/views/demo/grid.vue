<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/23
 -->
<template>
  <s-layout>
    <h1>Grid</h1>

    <s-panel title="Default">
      <s-row>
        <s-col />
        <s-col />
        <s-col />
      </s-row>
    </s-panel>

    <s-panel title="Justify">
      <s-row justify="left">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row justify="right">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row justify="center">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row justify="between">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row justify="around">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
    </s-panel>

    <s-panel title="Align">
      <s-row
        class="align"
        align="top">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row
        class="align"
        align="bottom">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row
        class="align"
        align="center">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row
        class="align"
        align="stretch">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
    </s-panel>
  </s-layout>
</template>

<script>
export default {
  name: 'VGrid'
}
</script>

<style lang="scss" scoped>
  .align {
    height: 100px;
  }
  .s-row {
    border: 1px solid rgba(0, 0, 0, .15);
    margin-bottom: 24px;
  }
  .s-col {
    background-color: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2);
    padding: 25px;
  }
</style>
