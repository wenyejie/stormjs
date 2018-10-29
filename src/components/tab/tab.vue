<!--
 - tab
 -
 - @author: Storm
 - @date: 2018/02/27
 -->
<template>
  <div class="s-tab">
    <ul class="s-tab-nav">
      <li
        v-for="item in list"
        :key="item.name"
        :class="item.name === activeName ? 'on' : ''"
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
    }
  },
  data () {
    return {
      list: [],
      activeName: undefined
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
      position: relative;
      display: flex;
      padding: 16px 24px;

      &-item {
        color: #8391a5;
        font-size: 16px;
        line-height: 22px;
        cursor: pointer;
        transition: color .3s ease-in-out;

        &:hover {
          color: $default;
        }

        &.on {
          color: #0facf3;
          cursor: default;
        }

        & + & {
          margin-left: 48px;
        }
      }
    }
  }
</style>
