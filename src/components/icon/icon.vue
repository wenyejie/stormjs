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
      type: Boolean,
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

      // 判断是否有颜色
      if (this.color && !isTheme(this.color)) {
        result[this.fill ? 'background-color' : 'color'] = this.color
      }
      return result
    },
    classes () {
      return {
        [`s-icon-${this.type}`]: !!this.type,
        [`s-icon-fill`]: !!this.fill,
        [`${this.fill ? 'bg' : 'c'}-${this.color}`]: isTheme(this.color)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  @font-face {
    font-family: "iconfont";
    src: url('./font/iconfont.eot?t=1540193140708'); /* IE9*/
    src: url('./font/iconfont.eot?t=1540193140708#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
    url('./font/iconfont.ttf?t=1540193140708') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('./font/iconfont.svg?t=1540193140708#iconfont') format('svg'); /* iOS 4.1- */
  }
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
      line-height: 30px;
      font-size: 20px;
      color: #fff;
      border-radius: 3px;
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

    &-info:before,
    &-warning:before {
      content: "\e765";
    }

    &-sousuox:before {
      content: "\e751";
    }

    &-shouqix:before {
      content: "\e77f";
    }

    &-zhankaix:before {
      content: "\e780";
    }

    &-guanbix:before {
      content: "\e790";
    }

    &-jiantoushangx:before {
      content: "\e7ac";
    }

    &-sanjiaojiantouxiax:before {
      content: "\e7ad";
    }

    &-duihaox:before {
      content: "\e7ae";
    }

    &-tianjiax:before {
      content: "\e7af";
    }

    &-zuojiantoux:before {
      content: "\e7b0";
    }

    &-success:before {
      content: "\e7bb";
    }

    &-danger:before {
      content: "\e7bc";
    }

    &-fanhuix:before {
      content: "\e7bf";
    }

    &-zichanguanlix:before {
      content: "\e7cc";
    }

    &-moxingguanlix:before {
      content: "\e7cd";
    }

    &-ziyuanguanlix:before {
      content: "\e7ce";
    }

    &-chanpinguanlix:before {
      content: "\e7cf";
    }

    &-xitongpeizhix:before {
      content: "\e7d0";
    }

    &-jiantoushangx-copy:before {
      content: "\e7d1";
    }

    &-daorux:before {
      content: "\e7d2";
    }

  }
</style>
