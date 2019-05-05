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
      <s-row justify="start">
        <s-col />
        <s-col />
        <s-col />
      </s-row>
      <s-row justify="end">
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

    <s-panel title="Span">
      <s-row>
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
        <s-col :span="1" />
      </s-row>
      <s-row>
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
        <s-col :span="2" />
      </s-row>
      <s-row>
        <s-col :span="3" />
        <s-col :span="3" />
        <s-col :span="3" />
        <s-col :span="3" />
        <s-col :span="3" />
        <s-col :span="3" />
        <s-col :span="3" />
        <s-col :span="3" />
      </s-row>
      <s-row>
        <s-col :span="4" />
        <s-col :span="4" />
        <s-col :span="4" />
        <s-col :span="4" />
        <s-col :span="4" />
        <s-col :span="4" />
      </s-row>
      <s-row>
        <s-col :span="6" />
        <s-col :span="6" />
        <s-col :span="6" />
        <s-col :span="6" />
      </s-row>
      <s-row>
        <s-col :span="8" />
        <s-col :span="8" />
        <s-col :span="8" />
      </s-row>
      <s-row>
        <s-col :span="12" />
        <s-col :span="12" />
      </s-row>
      <s-row>
        <s-col :span="24" />
      </s-row>
    </s-panel>

    <s-panel title="Gutter">
      <s-row
        style="border: none;"
        :gutter="24">
        <s-col
          style="background-color: transparent; border: none; padding-top: 0; padding-bottom: 0;"
          :span="8">
          <div class="demo" />
        </s-col>
        <s-col
          style="background-color: transparent; border: none; padding-top: 0; padding-bottom: 0;"
          :span="8">
          <div class="demo" />
        </s-col>
        <s-col
          style="background-color: transparent; border: none; padding-top: 0; padding-bottom: 0;"
          :span="8">
          <div class="demo" />
        </s-col>
      </s-row>
    </s-panel>

    <s-panel title="wrap 换行">
      <s-row wrap>
        <s-col :span="8" />
        <s-col :span="8" />
        <s-col :span="8" />
        <s-col :span="8" />
        <s-col :span="8" />
        <s-col :span="8" />
        <s-col :span="8" />
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
  .demo {
    border-radius: 2px;
    height: 30px;
    background-color: #eee;
    text-align: center;
    line-height: 30px;
    color: #aaa;
  }

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
