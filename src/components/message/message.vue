<!--
 - message
 -
 - @author: Storm
 - @date: 2018/02/24
 -->
<template>
  <transition name="s-message">
    <div
      v-if="visible"
      :class="classes"
      class="s-message">
      <div class="s-message-content">
        <s-icon
          v-if="iconType"
          :type="iconType"
          class="s-message-icon" />
        <slot>
          {{ content }}
        </slot>
        <a
          class="s-message-close"
          href="javascript:;"
          @click="handleClose">
          <s-icon type="close" />
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SMessage',
  props: {
    value: {
      type: Boolean,
      default: false
    },

    // 类型
    type: {
      type: String,
      default: undefined,
      validator (val) {
        return ['success', 'warning', 'info', 'danger'].includes(val)
      }
    },

    // 内容
    content: {
      type: String,
      default: ''
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
      visible: false
    }
  },
  computed: {
    classes () {
      return [`s-message-${this.type}`]
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
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.visible) return
      this.show()
    }
  },
  created () {
    if (this.value) this.show()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
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
        this.timer = setTimeout(this.remove, this.duration)
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
  .s-message {
    position: fixed;
    z-index: 2018;
    line-height: 20px;
    top: 24px;
    left: 50%;
    background-color: #fff;
    transition: all .3s ease-in-out;
    overflow: hidden;
    padding: 10px 46px 10px 16px;
    border-radius: 3px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .1);
    pointer-events: all;
    text-align: center;
    transform: translate(-50%, 0);
    border-left: 4px solid transparent;
    min-width: 200px;

    &-enter,
    &-leave-active {
      opacity: 0;
      transform: translate(-50%, -100%);
    }

    &-close {
      position: absolute;
      right: 15px;
      top: 15px;
      color: #b9c1ce;
      line-height: 1;

      &:hover {
        color: #a8afce;
      }
    }

    &-content {
      display: flex;
      align-items: center;
    }

    &-icon {
      margin-right: 8px;
      font-size: 18px;
    }

    &-success {
      border-left-color: #48c673;
      .s-message-icon {
        color: #48c673;
      }
    }

    &-info {
      .s-message-icon {
        color: $info;
      }
    }

    &-warning {
      border-left-color: #f35b80;
      .s-message-icon {
        color: #f35b80;
      }
    }

    &-danger {
      border-left-color: #f35b80;
      .s-message-icon {
        color: #f35b80;
      }
    }

    &-header + &-body {
      margin-top: 10px;
    }
  }
</style>
