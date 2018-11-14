<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/14
 -->
<template>
  <s-layout>
    <h1>Input</h1>
    <s-panel
      title="Default"
      padding>
      <div>
        <s-input />
      </div>
      <div class="mt-24">
        <s-input prefixicon="success" />
      </div>
      <div class="mt-24">
        <s-input suffixicon="success" />
      </div>
      <div class="mt-24">
        <s-input>
          <template slot="prepend">年龄</template>
        </s-input>
      </div>
      <div class="mt-24">
        <s-input>
          <template slot="append">年龄</template>
        </s-input>
      </div>
      <div class="mt-24">
        <s-input block>
          <template slot="prepend">年龄</template>
        </s-input>
      </div>
    </s-panel>
  </s-layout>
</template>

<script>
export default {
  name: 'VDemoInput'
}
</script>

<style lang="scss" scoped>

</style>
