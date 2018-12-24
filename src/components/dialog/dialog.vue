<!--
 - dialog
 -
 - @author: Storm
 - @date: 2018/01/20
 -->
<template>
  <transition name="s-dialog">
    <section
      v-if="visible"
      :class="classes"
      class="s-dialog"
      @click.self="handleMask">
      <!--<s-mask
        class="s-dialog-mask"
        v-if="hasMask"
        v-model="hasMask"
        @click="handleMask"/>-->
      <div
        :style="styles"
        class="s-dialog-content">
        <header
          v-if="$slots.header || title"
          class="s-dialog-header">
          <slot name="header">
            <h1 class="s-dialog-title">{{ title }}</h1>
          </slot>
        </header>
        <div class="s-dialog-body">
          <slot>
            <div
              class="s-dialog-body-html"
              v-html="body" />
          </slot>
        </div>
        <footer
          v-if="hasFooter"
          class="s-dialog-footer">
          <slot name="footer">
            <slot name="footerBefore" />
            <s-button
              v-if="hasCancel"
              class="s-dialog-btn s-dialog-cancel"
              outline
              @click="handleCancel">
              <slot name="cancel">{{ cancelText }}</slot>
            </s-button>
            <slot name="footerButton" />
            <s-button
              v-if="hasOk"
              class="s-dialog-btn s-dialog-ok"
              type="info"
              @click="handleOk">
              <slot name="ok">{{ okText }}</slot>
            </s-button>
            <slot name="footerAfter" />
          </slot>
        </footer>
        <a
          v-if="hasClose"
          class="s-dialog-close"
          href="javascript:;"
          @click="handleClose">×
        </a>
      </div>
    </section>
  </transition>
</template>

<script>
import elOverflowToggle from '../../utils/elOverflowToggle'

export default {
  name: 'SDialog',
  props: {

    // value
    value: {
      type: Boolean,
      default: false
    },

    // 标题
    title: {
      type: String,
      default: ''
    },

    // 内容
    body: {
      type: String,
      default: ''
    },

    // 组件名称
    name: {
      type: String,
      default: ''
    },

    // 大小
    size: {
      type: [String, Number],
      default: undefined
    },

    shadow: {
      type: Boolean,
      default: false
    },

    // 遮罩层, 背景颜色
    backgroundColor: {
      type: String,
      default: ''
    },

    // 是否有遮罩层
    mask: {
      type: [Boolean, String],
      default: true
    },

    // 可以通过背景移除弹出框
    maskRemove: {
      type: Boolean,
      default: false
    },

    // 是否有尾部
    hasFooter: {
      type: Boolean,
      default: true
    },

    // 是否有关闭按钮
    hasClose: {
      type: Boolean,
      default: true
    },

    // 是否有确定按钮
    hasOk: {
      type: Boolean,
      default: true
    },

    // 是否有取消按钮
    hasCancel: {
      type: Boolean,
      default: true
    },

    // 确定按钮文本
    okText: {
      type: String,
      default: '确定'
    },

    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消'
    },

    // 当用户确认时是否自动关闭
    isOkClose: {
      type: Boolean,
      default: false
    },

    // 弹出框内容对齐方式
    align: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'center'].includes(val)
      }
    }
  },
  data () {
    return {

      // 可见性
      visible: this.value
    }
  },
  computed: {

    /**
     * class name
     * @return {Object}
     */
    classes () {
      return {
        [`s-dialog-${this.size}`]: !!this.size && typeof this.size === 'string',
        [`s-dialog-${this.name}`]: !!this.name,
        [`s-dialog-align-${this.align}`]: !!this.align,
        's-dialog-mask': !!this.mask
      }
    },

    styles () {
      const result = {}
      if (typeof this.size === 'number') {
        result.width = `${this.size}px`
      }

      return result
    }
  },
  watch: {

    /**
     * 监听value值
     * @param val 新值
     * @param oldVal 旧值
     */
    value (val, oldVal) {
      // 如果新旧值相同, 则退出方法
      if (val === oldVal || val === this.visible) {
        return false
      }
      this.visible = val
      elOverflowToggle(val)
    }
  },
  beforeDestroy () {
    elOverflowToggle(false)
  },
  created () {
    if (this.value) {
      elOverflowToggle(true)
    }
  },
  methods: {

    /**
     * 移除dialog
     */
    remove () {
      this.visible = false
      elOverflowToggle(false)
      this.$emit('input', false)
    },

    /**
     * 弹出框操作
     */
    handleMask () {
      // 是否可以通过背景移除弹出框
      if (this.maskRemove) {
        this.$emit('mask')
        this.remove()
      }
    },

    /**
     * 取消事件
     */
    handleCancel () {
      this.$emit('cancel')
      this.remove()
    },

    /**
     * 确定时间
     */
    handleOk () {
      this.$emit('ok')
      this.isOkClose && this.remove()
    },

    /**
     * 关闭事件
     */
    handleClose () {
      this.$emit('close')
      this.remove()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-dialog {
    position: fixed;
    @include absolute-center;
    z-index: 1024;
    transition: all .15s ease-in-out;

    &-mask {
      background-color: rgba(0, 0, 0, 0.5);
    }

    &-enter,
    &-leave-active {
      opacity: 0;
      transform: scale(1.1);
    }

    &-content {
      width: 420px;
      background-color: #fff;
      border-radius: 4px;
      position: relative;
    }

    &-align {
      &-center {

        .s-dialog-content {
          position: absolute;
          @include hv-center-transform;
        }
      }

      &-top {
        padding: 25px;
        overflow-y: auto;

        .s-dialog-content {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    &-header {
      position: relative;
      padding: 18.5px 24px;
      border-bottom: 1px solid #eee;
    }

    &-title {
      font-size: $lg;
      line-height: 1;
      font-weight: normal;
    }

    &-close {
      font-size: 24px;
      position: absolute;
      z-index: 1;
      color: #999;
      right: 18px;
      top: 16px;
      line-height: 1;

      .s-icon {
        display: block;
      }
    }

    &-body {
      padding: 16px 24px 24px;
      color: #48576a;
      font-size: $md;
      position: relative;
    }

    &-footer {
      border-top: 1px solid #eee;
      padding: 16px 24px;
      text-align: right;
    }

    &-btn {
      min-width: 96px;
      & + .s-dialog-btn {
        margin-left: 16px;
      }
    }

    &-lg {
      .s-dialog {
        &-content {
          width: 960px;
        }
      }
    }

    &-md {
      .s-dialog {
        &-content {
          width: 640px;
        }
      }
    }

    &-sm {
      .s-dialog {
        &-content {
          width: 320px;
        }
      }
    }

    &-auto {
      .s-dialog {
        &-content {
          width: auto;
        }
      }
    }

  }
</style>
