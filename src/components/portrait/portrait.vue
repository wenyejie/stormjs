<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/10
 -->
<template>
  <span
    :style="styles"
    :class="classes"
    class="s-portrait">{{ nameFirst }}</span>
</template>

<script>
export default {
  name: 'SPortrait',
  props: {
    size: {
      type: [Number, String],
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    showNum: {
      type: Number,
      default: 1
    }
  },
  computed: {
    nameFirst () {
      return (this.name || '').slice(0, this.showNum).toLocaleUpperCase()
    },

    styles () {
      const result = {}
      if (typeof this.size === 'number' && this.size !== 0) {
        result.width = `${this.size}px`
        result.height = `${this.size}px`
        result['line-height'] = `${this.size}px`
        result.fontSize = `${this.size / 2}px`
      }
      return result
    },

    classes () {
      return {
        [`s-portrait-${this.size}`]: typeof this.size === 'string'
      }
    }
  }
}
</script>

<style lang="scss">
  .s-portrait {
    background-color: #6884f3;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;

    &-lg {
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
  }
</style>
