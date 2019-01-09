<!--
 -
 -
 - @author: Storm
 - @date: 2018/07/27
 -->
<template>
  <ul
    class="s-timePickerSpinner"
    @scroll="handleScroll($event)">
    <li
      v-for="item in list"
      :class="{selected: item.selected, disabled: item.disabled}"
      :key="item.value"
      class="s-timePickerSpinner-item"
      @click="handleClick(item)">{{ item.value | zeroize }}
    </li>
  </ul>
</template>

<script>
import zeroize from '../../filters/zeroize'

export default {
  name: 'STimePickerSpinner',
  filters: { zeroize },
  props: {
    value: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      required: true
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
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initializeScroll(this.value)
    })
  },
  created () {
    this.oldInnerVal = this.innerVal
    this.list[this.value].selected = true
  },
  methods: {
    initializeScroll (value) {
      this.$el.scrollTop = value * 36
    },
    handleChange (item, isVisible) {
      if (item.disabled || item.value === this.oldInnerVal) return
      this.oldInnerVal = item.value
      this.innerVal = item.value
      this.list.filter(item => item.selected).forEach(item => {
        item.selected = false
      })
      item.selected = true
      this.$emit('input', item.value)
      this.$emit('change', isVisible)
    },

    scrollComputed (scrollTop) {
      const value = Math.round(scrollTop / 36)
      if (this.oldInnerVal === value) {
        return
      }
      this.handleChange(this.list[value], false)
    },
    handleScroll ($event) {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.scrollComputed.bind(this, $event.target.scrollTop), 100)
    },

    handleClick (item) {
      this.handleChange(item, true)
    }
  }
}
</script>
