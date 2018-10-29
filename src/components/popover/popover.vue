<!--
 -
 -
 - @author: Storm
 - @date: 2018/10/17
 -->
<template>
  <div
    class="s-popover"
    @focus="show('focus')"
    @blur="hide('focus')"
    @click="toggle('click')"
    @mouseenter="show('hover')"
    @mouseleave="hide('hover')">
    <slot name="reference" />
    <transition name="s-popover-inner">
      <section
        v-if="visible !== 0"
        v-show="visible === 1"
        :class="classes"
        class="s-popover-inner">
        <h1
          v-if="title"
          class="s-popover-title">{{ title }}</h1>
        <slot />
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SPopover',
  props: {
    title: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'click',
      validator (val) {
        return ['click', 'focus', 'hover'].includes(val)
      }
    },

    position: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'top-left', 'top-right', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-right', 'bottom-left', 'left', 'left-bottom', 'left-top'].includes(val)
      }
    }
  },
  data () {
    return {
      visible: 0
    }
  },
  computed: {
    classes () {
      return [
        `s-popover-${this.position}`
      ]
    }
  },
  methods: {
    show (type) {
      if (type !== this.trigger) return
      this.visible = 1
    },
    hide (type) {
      if (type !== this.trigger) return
      this.visible = 2
    },
    toggle (type) {
      if (type !== this.trigger) return
      if (this.visible !== 1) {
        this.show(type)
      } else {
        this.hide(type)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-popover {
    display: inline-block;
    position: relative;

    &-inner {
      position: absolute;
      transition: all .3s ease-in-out;
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      padding: 10px;
      min-width: 150px;
      text-align: justify;
      font-size: 14px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .3));
      }
      &-enter,
      &-leave-active {
        opacity: 0;
      }
    }
    &-top,
    &-top-left,
    &-top-right {
      &:after {
        bottom: -6px;
        margin-left: -6px;
        border-bottom-width: 0;
        border-top-color: #fff;
      }
    }
    &-top {
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 8px));
      &:after {
        left: 50%;
      }
    }
    &-top-left {
      top: 0;
      left: 0;
      transform: translate(0, calc(-100% - 8px));
      &:after {
        left: 15px;
      }
    }
    &-top-right {
      top: 0;
      right: 0;
      transform: translate(0, calc(-100% - 8px));
      &:after {
        right: 15px;
      }
    }
    &-right,
    &-right-top,
    &-right-bottom {
      &:after {
        left: -6px;
        margin-top: -6px;
        border-left-width: 0;
        border-right-color: #fff;
      }
    }
    &-right {
      right: 0;
      top: 50%;
      transform: translate(calc(100% + 8px), -50%);
      &:after {
        top: 50%;
      }
    }
    &-right-top {
      right: 0;
      top: 0;
      transform: translate(calc(100% + 8px), 0);
      &:after {
        top: 15px;
      }
    }
    &-right-bottom {
      right: 0;
      bottom: 0;
      transform: translate(calc(100% + 8px), 0);
      &:after {
        bottom: 15px;
      }
    }
    &-bottom,
    &-bottom-left,
    &-bottom-right {
      &:after {
        top: -6px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
      }
    }
    &-bottom {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, calc(100% + 8px));
      &:after {
        left: 50%;
      }
    }
    &-bottom-left {
      bottom: 0;
      left: 0;
      transform: translate(0, calc(100% + 8px));
      &:after {
        left: 15px;
      }
    }
    &-bottom-right {
      bottom: 0;
      right: 0;
      transform: translate(0, calc(100% + 8px));
      &:after {
        right: 15px;
      }
    }
    &-left,
    &-left-top,
    &-left-bottom {
      &:after {
        right: -6px;
        margin-top: -6px;
        border-right-width: 0;
        border-left-color: #fff;
      }
    }
    &-left {
      left: 0;
      top: 50%;
      transform: translate(calc(-100% - 8px), -50%);
      &:after {
        top: 50%;
      }
    }
    &-left-top {
      left: 0;
      top: 0;
      transform: translate(calc(-100% - 8px), 0);
      &:after {
        top: 15px;
      }
    }
    &-left-bottom {
      left: 0;
      bottom: 0;
      transform: translate(calc(-100% - 8px), 0);
      &:after {
        bottom: 15px;
      }
    }
  }
</style>
