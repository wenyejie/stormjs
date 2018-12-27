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
import queryComponentParent from '../../utils/queryComponentParent'

export default {
  name: 'SChosenItem',
  props: {
    value: {
      type: [String, Number, Object],
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
  data () {
    return {
      parent: null
    }
  },
  computed: {

    classes () {
      return {
        'is__selected': this.parent.selectedList.find(item => item._uid === this._uid),
        'is__disabled': this.disabled
      }
    }
  },
  created () {
    this.parent = queryComponentParent(this, 'SChosen')
    this.addSelf()
  },
  beforeDestroy () {
    this.removeSelf()
  },
  methods: {
    handleClick () {
      if (!this.parent || this.disabled) return
      this.parent.toggleItem(this._uid)
    },
    addSelf () {
      if (!this.parent) return
      this.parent.handleAdd(this)
    },
    removeSelf () {
      if (this.parent) {
        this.parent.handleRemove(this)
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

    &:not(.is__disabled):hover {
      background-color: #e6f7ff;
    }

    &.is__selected,
    &.is__selected:hover {
      background-color: #fafafa;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.65);
    }

    &.is__disabled {
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
