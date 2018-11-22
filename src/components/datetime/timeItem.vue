<!--
 -
 -
 - @author: Storm
 - @date: 2018/07/27
 -->
<template>
  <ul
    class="s-timeItem"
    @scroll="handleScroll($event)">
    <li
      v-for="item in list"
      :class="{selected: item.selected, disabled: item.disabled}"
      :key="item.value"
      class="s-timeItem-item"
      @click="handleClick(item)">{{ item.value | zeroize }}
    </li>
  </ul>
</template>

<script>
import zeroize from '../../filters/zeroize'

export default {
  name: 'STimeItem',
  filters: { zeroize },
  props: {
    value: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      innerVal: this.value
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.innerVal = val
      this.setScrollTop()
    },

    visible (val) {
      if (val) this.setScrollTop()
    }
  },
  mounted () {
    this.setScrollTop()
  },
  created () {
    this.oldInnerVal = this.innerVal
    this.list[this.value].selected = true
  },
  methods: {

    // 设置滚动条高度
    setScrollTop () {
      this.$el.scrollTop = this.innerVal * 36
    },

    handleChange (item, isVisible) {
      if (item.disabled || item.value === this.oldInnerVal) return
      this.oldInnerVal = item.value
      this.innerVal = item
      this.list.filter(item => item.selected).forEach(item => {
        item.selected = false
      })
      item.selected = true
      this.$emit('input', item.value)
      this.$emit('change', isVisible)
    },

    scrollComputed (scrollTop) {
      this.handleChange(this.list[Math.round(scrollTop / 36)], false)
    },
    handleScroll ($event) {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.scrollComputed.bind(this, $event.target.scrollTop), 32)
    },

    handleClick (item) {
      this.handleChange(item, true)
    }
  }
}
</script>

<style lang="scss">
  .s-timeItem {
    flex: 1;
    height: 100%;
    overflow: auto;
    text-align: center;
    -ms-overflow-style: none;
    position: relative;
    z-index: 1;

    &::-webkit-scrollbar {
      display: none;
    }

    &:before,
    &:after {
      content: '';
      height: 78px;
      display: block;
    }

    li {
      height: 36px;
      line-height: 36px;

      &.selected:not(.disabled) {
        color: #303133;
        font-weight: 700;
      }

      &.disabled {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &:hover {
        background-color: #f5f7fa;
        cursor: pointer;
      }

    }
  }
</style>
