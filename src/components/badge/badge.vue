<!--
 - badge
 -
 - @author: Storm
 - @date: 2018/08/01
 -->
<template>
  <span class="s-badge">
    <slot />
    <sup
      :class="supClasses"
      class="s-badge-sup">{{ innerText }}</sup>
  </span>
</template>

<script>
const maxVal = (input, isDot, max = 99) => {
  if (input === void 0 || isDot) {
    return ''
  } else if (typeof input === 'string') return input
  return input <= max ? input : `${max}+`
}

export default {
  name: 'SBadge',
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    type: {
      default: 'danger',
      validator (val) {
        return ['primary', 'info', 'success', 'danger', 'warning', 'default'].includes(val)
      }
    },

    // 最大值
    max: {
      type: Number,
      default: 99
    },

    // 是否为一个点
    isDot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    supClasses () {
      return {
        'isDot': this.isDot,
        'isFixed': this.$slots.default,
        [`s-badge-${this.type}`]: !!this.type
      }
    },

    innerText () {
      return maxVal(this.value, this.isDot, this.max)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-badge {
    position: relative;
    vertical-align: middle;
    display: inline-block;

    &-sup {
      top: 0;
      border-radius: 10px;
      color: #fff;
      display: block;
      font-size: 12px;
      height: 20px;
      line-height: 18px;
      padding: 0 6px;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #fff;

      &.isFixed {
        position: absolute;
        top: 0;
        right: 10px;
        transform: translateY(-50%) translateX(100%);
      }

      &.isDot {
        height: 8px;
        width: 8px;
        padding: 0;
        /*right: 5px;*/
        border-radius: 50%;
      }
    }

    &-warning {
      background-color: $warning;
    }

    &-danger {
      background-color: $danger;
    }

    &-success {
      background-color: $success;
    }

    &-info {
      background-color: $info;
    }

    &-primary {
      background-color: $primary;
    }

    &-default {
      background-color: $default;
      color: gray;
    }
  }
</style>
