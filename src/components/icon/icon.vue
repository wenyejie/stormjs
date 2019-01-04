<!--
 - icon
 -
 - @author: Storm
 - @date: 2017/12/20
 -->
<template>
  <i
    :style="styles"
    :class="classes"
    class="s-icon" />
</template>

<script>
const isTheme = name => /^(primary|success|info|danger|default)$/.test(name)

export default {
  name: 'SIcon',
  props: {

    // 类型
    type: {
      required: true,
      type: String
    },

    // 大小
    size: {
      type: [String, Number],
      default: ''
    },

    // 颜色
    color: {
      type: [String],
      default: ''
    },

    fill: {
      type: [Boolean, Number],
      default: false
    }
  },
  computed: {
    styles () {
      const result = {}

      // 判断是否为number类型
      if (typeof this.size === 'number') { // 是
        result.fontSize = `${this.size}px`
      } else if (typeof this.size === 'string' && /\d/.test(this.size)) {
        result.fontSize = this.size
      }

      // 填充颜色区域大小
      if (Number.isSafeInteger(this.fill)) {
        result.width = `${this.fill}px`
        result.height = `${this.fill}px`
        result.fontSize = `${this.fill * 0.6666666666666666}px`
      }

      // 判断是否有颜色
      if (this.color && !isTheme(this.color)) {
        result[this.fill ? 'background-color' : 'color'] = this.color
      }
      return result
    },
    classes () {
      return {
        [`icon-${this.type}`]: !!this.type,
        [`s-icon-fill`]: !!this.fill,
        [`${this.fill ? 'bg' : 'c'}-${this.color}`]: isTheme(this.color),
        [`s-icon-${this.fill}`]: !!this.fill
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-icon {
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    speak: none;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;

    &-fill {
      width: 30px;
      height: 30px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #fff;
      border-radius: 3px;
    }

    &-sm {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
    }

    &-loading:before {
      content: '';
      border-radius: 50%;
      border-bottom: 1px solid #fff;
      width: 1em;
      height: 1em;
    }

    &-info {
      transform: rotate(180deg);
    }

    &-info:before {
      content: "\e765";
    }

  }
</style>

<style>
  @import "./font/iconfont.css";
</style>
