<!--
 - checkbox
 -
 - author: Storm
 - date: 2017/10/07
 -->

<template>
  <label
    :class="classes"
    class="s-checkbox">
    <input
      :name="name"
      :title="title"
      :checked="checked"
      :true-value="trueValue"
      :false-value="falseValue"
      :readonly="readonly"
      :disabled="disabled"
      type="checkbox"
      class="s-checkbox-input"
      @change="handleChange($event)"
      @click="handleClick($event)">
    <span class="s-checkbox-indi" />
    <span class="s-checkbox-desc"><slot /></span>
  </label>
</template>

<script>
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'SCheckbox',
  mixins: [formElementMixins],
  props: {

    // 值
    value: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: false
    },

    // 选中的值
    trueValue: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: true
    },

    // 非选中的值
    falseValue: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: false
    },

    // 是否为块元素
    block: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: null
    }
  },
  computed: {

    /**
         * className
         */
    classes () {
      return [
        {
          [`s-checkbox-block`]: !!this.block
        }
      ]
    },

    // 判断是否为group
    isGroup () {
      return this.$parent.$options.name === 'sCheckboxGroup'
    }
  },
  watch: {
    value (val, oldVal) {
      if (val !== oldVal) {
        this.setChecked()
      }
    },
    '$parent.value' (val, oldVal) {
      if (val !== oldVal) {
        this.setChecked()
      }
    }
  },
  created () {
    this.setChecked()
  },
  beforeDestroy () {
    // 如果是group并且被选中, 通知父组件取消该值
    if (this.isGroup && this.checked) {
      this.$parent.update(false, this.value)
    }
  },
  methods: {

    /**
         * 选中checkbox
         * @param $event 选中值
         */
    handleChange ($event) {
      this.checked = $event.target.checked
      if (this.isGroup) {
        this.$parent.update(this.checked, this.value)
      }
      this.$emit('input', this.checked ? this.trueValue : this.falseValue)
      this.handleValidate()
      this.$emit('change', this.checked)
    },

    handleClick ($event) {
      this.$emit('click', $event)
    },

    /**
         * 设置是否选中
         */
    setChecked () {
      // 判断是否为群组
      if (this.isGroup) { // 是
        this.checked = this.$parent.value.includes(this.value)
      } else { // 不是
        this.checked = this.value === this.trueValue
      }
    }
  }
}
</script>

<style lang="scss">
  .s-checkbox {
    position: relative;
    display: inline-block;

    & + & {
      margin-left: 12px;
    }

    & + &-block {
      margin-left: 0;
    }

    &-input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    &-indi,
    &-desc {
      display: inline-block;
      vertical-align: middle;
    }

    &-desc {
      padding: 0 8px;
    }

    &-indi {
      pointer-events: none;
      user-select: none;
      width: 16px;
      height: 16px;
      border: 1px solid #d9d9d9;
      background-color: #fff;
      transition: background-color .3s ease;
    }

    &-input:checked + &-indi {
      border: none;
      color: #fff;
      background: #007bff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E") no-repeat center;
      background-size: 60%;
    }

    &-desc {

    }

    &-block {
      display: block;
    }
  }
</style>
