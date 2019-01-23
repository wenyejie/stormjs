<!--
 * @Description: 可调节大小展示块
 * @Author: Ntfs
 * @Date: 2019-01-23 16:57:30
 * @LastEditors: Ntfs
 * @LastEditTime: 2019-01-23 17:18:50
 -->

<template>
  <div
    ref="dragWrap"
    :style="{'height': `${warpHeight}px`, 'width': `${warpWidth}px` }"
    :class="`dragWrap ${propClass} ${active ? 'active' : ''}`">
    <div class="dragContent">
      <div
        ref="dragMask"
        class="dragMask" />
      <slot name="dragContent" />
    </div>
    <!-- <div
      ref="lefTop"
      :class="`dragIcon lefTop ${active ? '' : 'hide'}`" /> -->
    <!-- <div
      ref="top"
      :class="`dragIcon top ${active ? '' : 'hide'}`" /> -->
    <!-- <div
      ref="rightTop"
      :class="`dragIcon rightTop ${active ? '' : 'hide'}`" /> -->
    <!-- <div
      ref="right"
      :class="`dragIcon right ${active ? '' : 'hide'}`" /> -->
    <div
      ref="rightBottom"
      :class="`dragIcon rightBottom ${active ? '' : 'hide'}`" />
      <!-- <div
      ref="bottom"
      :class="`dragIcon bottom ${active ? '' : 'hide'}`" /> -->
      <!-- <div
      ref="leftBottom"
      :class="`dragIcon leftBottom ${active ? '' : 'hide'}`" /> -->
      <!-- <div
      ref="left"
      :class="`dragIcon left ${active ? '' : 'hide'}`" /> -->

  </div>
</template>

<script>

import Drag from './dragable'

export default {
  name: 'DynamicBlock',
  components: {},
  props: {
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 640
    },
    propClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: false,
      warpWidth: this.width,
      warpHeight: this.height
    }
  },
  watch: {

  },
  mounted () {
    this.canDrag = new Drag()
    const _this = this
    document.querySelector('body').addEventListener('click', function (event) {
      if (event.target === _this.$refs.dragWrap || event.target === _this.$refs.dragMask) {
        _this.active = true
      } else if (event.target !== _this.$refs.lefTop && event.target !== _this.$refs.top && event.target !== _this.$refs.rightTop && event.target !== _this.$refs.right && event.target !== _this.$refs.rightBottom && event.target !== _this.$refs.bottom && event.target !== _this.$refs.lefBottom && event.target !== _this.$refs.lef) {
        _this.active = false
      }
    })
    this.canDrag.init({
      el: this.$refs.rightBottom,
      toMove: function (ev, position) {
        ev.stopPropagation()
        _this.warpWidth = position.X + 14
        _this.warpHeight = position.Y + 14
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .dragWrap {
    display: inline-block;
    position: relative;
    border: 1px solid transparent;
    padding: 2px;
    overflow: hidden;
    .dragIcon {
      z-index: 11;
      cursor: move !important;
      display: inline-block;
      height: 12px;
      width: 12px;
      position: absolute;
      &.lefTop {
        cursor: se-resize;
        top: 0;
        left: 0;
        border-top: 2px solid #0FACF3;
        border-left: 2px solid #0FACF3;
      }
      &.top {
        cursor: s-resize;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border-top: 2px solid #0FACF3;
      }
      &.rightTop {
        cursor: sw-resize;
        top: 0;
        right: 0;
        border-top: 2px solid #0FACF3;
        border-right: 2px solid #0FACF3;
      }
      &.right {
        cursor: w-resize;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        border-right: 2px solid #0FACF3;
      }
      &.rightBottom {
        cursor: nw-resize;
        bottom: 0;
        right: 0;
        border-bottom: 2px solid #0FACF3;
        border-right: 2px solid #0FACF3;
      }
      &.bottom {
        cursor: n-resize;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-bottom: 2px solid #0FACF3;
      }
      &.leftBottom {
        cursor: ne-resize;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid #0FACF3;
        border-left: 2px solid #0FACF3;
      }
      &.left {
        cursor: e-resize;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-left: 2px solid #0FACF3;
      }
      &.hide {
        display: none;
      }
    }
    .dragContent {
      width: 100%;
      height: 100%;
      position: relative;
      .dragMask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: transparent;
      }
    }
    &.active {
      border: 1px solid #0FACF3;
    }
  }
</style>
