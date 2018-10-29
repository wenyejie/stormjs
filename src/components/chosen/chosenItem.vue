<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/27
 -->
<template>
  <li
    :class="classes"
    class="s-chosen-item"
    @click="handleClick">
    <slot />
  </li>
</template>

<script>
export default {
  name: 'SChosenItem',
  props: {
    value: {
      type: [String, Boolean, Number, Object, Date, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    isGroup () {
      return this.$parent.$options.name === 'SChosen'
    },

    // 是都多选
    isMultiple () {
      return this.$parent.multiple
    },

    // 是否有分隔符
    isSeparator () {
      return this.$parent.separator
    },

    selected () {
      const innerVal = this.$parent.innerVal
      return this.isMultiple ? innerVal.includes(this.isSeparator ? this.value + '' : this.value) : innerVal === this.value
    },
    classes () {
      return {
        'disabled': this.disabled,
        'selected': this.selected
      }
    }
  },
  methods: {
    handleClick () {
      if (this.isGroup && !this.disabled) {
        this.$parent.handleItemClick(this, this.value)
      }
    }
  }
}
</script>

<style lang="scss">
  .s-chosen-item {
    padding: 5px 12px;
    line-height: 22px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.65);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.3s ease;

    &:not(.disabled):hover {
      background-color: #e6f7ff;
    }

    &.selected,
    &.selected:hover {
      background-color: #fafafa;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.65);
    }

    &.disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
</style>
