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
    <div class="s-tab-header">
      <ul class="s-tab-nav">
        <li
          v-for="item in list"
          :key="item.name"
          :class="item.name === activeName ? 's-tab-active' : ''"
          class="s-tab-nav-item"
          @click="toggle(item)">
          {{ item.label }}
          <s-icon
            class="s-tab-nav-icon"
            :type="item.icon" />
        </li>
      </ul>
      <slot name="header" />
    </div>
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
    position: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'right', 'bottom', 'left'].includes(val)
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
    justify: {
      type: String,
      default: '',
      validator (val) {
        return ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val)
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
        [`s-tab-${this.position}`]: !!this.position,
        [`s-tab-${this.type}`]: !!this.type,
        's-tab-padding': isTrue(this.padding),
        [`s-tab-justify-${this.justify}`]: !!this.justify
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

    &-bottom,
    &-top {
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

    &-bottom {
      display: flex;
      flex-direction: column-reverse;
    }

    &-right {
      display: flex;
      flex-direction: row-reverse;
    }

    &-left {
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

    &-right {
      display: flex;

      .s-tab {

        &-nav {
          border-left: 1px solid #eaeefb;

          &-item {
            border-left: 1px solid transparent;
            margin-left: -1px;

            &.s-tab-active {
              border-left-color: #0facf3;
            }
          }
        }

        &-content {
          flex: 1;
        }
      }
    }

    &-justify {
      &-start .s-tab-nav {
        justify-content: flex-start;
      }

      &-center .s-tab-nav {
        justify-content: center;
      }

      &-end .s-tab-nav {
        justify-content: flex-end;
      }

      &-around .s-tab-nav {
        justify-content: space-around;
      }

      &-between .s-tab-nav {
        justify-content: space-between;
      }

      &-evenly .s-tab-nav {
        justify-content: space-evenly;
      }
    }

    &-card {
      .s-tab {
        &-nav {
          &-item {
            border: 1px solid #eaeefb;

            &:not(:first-child) {
              margin-left: -1px;
            }
          }
        }
      }
    }

    &.s-tab-top {
      .s-tab-nav-item.s-tab-active {
        border-bottom-color: #fff;
      }
    }
  }

</style>
