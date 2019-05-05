<!--
 - notice
 -
 - @author: Storm
 - @date: 2018/02/24
 -->
<template>
  <transition name="s-notice">
    <div
      v-if="visible"
      :class="classes"
      class="s-notice">
      <s-icon
        v-if="iconType"
        :class="iconClasses"
        :type="iconType"
        class="s-notice-type" />
      <div class="s-notice-content">
        <a
          v-if="hasClose"
          class="s-notice-close"
          @click="handleClose">
          <s-icon type="close" />
        </a>
        <div
          v-if="$slots.header || title"
          class="s-notice-header">
          <slot name="header"><h2>{{ title }}</h2></slot>
        </div>
        <div class="s-notice-body">
          <slot>
            <div v-html="body" />
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SNotice',
  props: {
    value: {
      type: Boolean,
      default: false
    },

    // 标题
    title: {
      type: String,
      default: ''
    },

    // 类型
    type: {
      type: String,
      default: undefined,
      validator (val) {
        return [undefined, 'success', 'warning', 'info', 'danger'].includes(val)
      }
    },

    // 内容
    body: {
      type: String,
      default: ''
    },

    // 是否有关闭按钮
    hasClose: {
      type: Boolean,
      default: true
    },

    // 持续时间
    duration: {
      type: Number,
      default: 3000
    }

  },
  data () {
    return {

      // 可见性
      visible: this.value
    }
  },
  computed: {
    classes () {
      return {}
    },
    iconType () {
      switch (this.type) {
        case 'success':
          return 'success'
        case 'warning':
          return 'warning'
        case 'info':
          return 'info'
        case 'danger':
          return 'danger'
        default:
          return false
      }
    },
    iconClasses () {
      return `s-notice-${this.type}`
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.visible) return
      this.show()
    }
  },
  methods: {

    /**
     * 展示消息提示
     */
    show () {
      this.visible = true
      this.$emit('input', true)

      // 判断是否自动移除
      if (this.duration) {
        setTimeout(this.remove, this.duration)
      }
    },

    /**
     * 移除消息提示
     */
    remove () {
      this.visible = false
      this.$emit('input', false)
    },

    /**
     * 移除消息提示
     */
    handleClose () {
      this.remove()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-notice {
    position: fixed;
    top: 24px;
    right: 24px;
    padding: 16px 48px 16px 24px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transition: all .3s ease-in-out;
    overflow: hidden;
    border-radius: 2px;

    &-enter,
    &-leave-active {
      opacity: 0;
      transform: translateX(100%);
    }

    &-close {
      position: absolute;
      cursor: pointer;
      color: $lightGrey;
      top: 17px;
      right: 16px;
      line-height: 1;
      font-size: 18px;
    }

    &-type + &-content {
      padding-left: 55px;
    }

    &-type {
      font-size: 40px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &-success {
      color: $success;
    }

    &-info {
      color: $info;
    }

    &-warning {
      color: $warning;
    }

    &-danger {
      color: $danger;
    }

    &-header + &-body {
      margin-top: 10px;
    }

    &-body {
      color: #8391a5;
      text-align: justify;
    }
  }
</style>
