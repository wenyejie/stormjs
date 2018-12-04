<!--
 - tab
 -
 - @author: Storm
 - @date: 2018/02/27
 -->
<template>
  <div
    class="s-tab"
    :class="classes">
    <ul class="s-tab-nav">
      <li
        v-for="item in list"
        :key="item.name"
        :class="item.name === activeName ? 's-tab-active' : ''"
        class="s-tab-nav-item"
        @click="toggle(item)"
        v-html="item.label" />
    </ul>
    <div class="s-tab-content">
      <slot />
    </div>
  </div>
</template>

<script>
import isTrue from '../../utils/isTrue'

export default {
  name: 'STab',
  props: {

    // 所在
    value: {
      type: [Number, String],
      default: 0
    },

    // 方向
    direction: {
      type: String,
      default: 'horizontal',
      validator (val) {
        return ['horizontal', 'vertical'].includes(val)
      }
    },

    // 是否要移除DOM
    hidden: {
      type: Boolean,
      default: false
    },

    // 名称
    name: {
      type: String,
      default: 'tab'
    },

    // 主题
    type: {
      type: String,
      default: ''
    },

    // 对齐方式
    align: {
      type: String,
      default: 'start',
      validator (val) {
        return ['start', 'center', 'end'].includes(val)
      }
    },

    // padding
    padding: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      list: [],
      activeName: undefined
    }
  },
  computed: {
    classes () {
      return {
        [`s-tab-${this.direction}`]: !!this.direction,
        [`s-tab-${this.type}`]: !!this.type,
        's-tab-padding': isTrue(this.padding)
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.toggle({ name: val })
    }
  },
  methods: {

    /**
     * 切换
     * @param item
     * @return {undefined}
     */
    toggle (item) {
      if (this.activeName === item.name) return
      this.activeName = item.name
      this.$emit('input', item.name)
    },

    /**
     * 增加子项
     * @param item
     */
    addItem (item) {
      this.list.push(item)
      if (this.list.length === 1) {
        this.toggle(item)
      }
    },

    /**
     * 移除子项
     * @param name
     */
    removeItem (name) {
      const index = this.list.findIndex(item => item.name === name)

      this.list.splice(index, 1)
      if (this.list.length <= 0) {

      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-tab {

    &-nav {
      background-color: #fff;

      &-item {
        color: #8391a5;
        cursor: pointer;
        padding: 12px 24px;
        transition: all .3s ease-in-out;

        &:hover {
          cursor: pointer;
          color: #0facf3;
        }

        &.s-tab-active {
          color: #0facf3;
          cursor: default;
        }
      }
    }

    &-padding {
      .s-tab {
        &-item {
          padding: 12px 24px;
        }
      }
    }

    &-horizontal {
      .s-tab {
        &-nav {
          display: flex;
          border-bottom: 1px solid #eaeefb;

          &-item {
            border-bottom: 1px solid transparent;
            margin-bottom: -1px;

            &.s-tab-active {
              border-bottom-color: #0facf3;
            }
          }
        }
      }
    }

    &-vertical {
      display: flex;

      .s-tab {

        &-nav {
          border-right: 1px solid #eaeefb;

          &-item {
            border-right: 1px solid transparent;
            margin-right: -1px;

            &.s-tab-active {
              border-right-color: #0facf3;
            }
          }
        }

        &-content {
          flex: 1;
        }
      }
    }
  }
</style>
