<!--
 - input
 -
 - @author: Storm
 - @date: 2017/12/22
 -->
<template>
  <div
    :class="classes"
    class="s-input">
    <span
      v-if="$slots.prepend"
      class="s-input-prepend">
      <slot name="prepend" />
    </span>
    <span
      v-if="$slots.prefix || prefixicon"
      class="s-input-prefix">
      <slot name="prefix">
        <s-icon
          :type="prefixicon" />
      </slot>
    </span>
    <input
      :type="type"
      :name="name"
      :title="title"
      v-model="innerVal"
      :required="required"
      :readonly="readonly"
      :max="max"
      :min="min"
      :step="step"
      :minlength="minlength"
      :maxlength="maxlength"
      :disabled="disabled"
      :pattern="pattern"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="s-input-inner"
      @click="handleClick($event)"
      @input="handleInput($event)"
      @change="handleChange($event)"
      @keyup="handleKeyup($event)"
      @keydown="handleKeydown($event)"
      @focus="handleFocus($event)"
      @mouseup="handleMouseup($event)"
      @mousedown="handleMousedown($event)"
      @blur="handleBlur($event)">
    <span
      v-if="$slots.append"
      class="s-input-append">
      <slot name="append" />
    </span>
    <span
      v-if="$slots.suffix || suffixicon"
      class="s-input-suffix">
      <slot name="suffix">
        <s-icon
          :type="suffixicon" />
      </slot>
    </span>
  </div>
</template>

<script>
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'SInput',
  mixins: [formElementMixins],
  props: {

    // 值
    value: {
      type: [String, Number, Object, Date, Array],
      default: ''
    },

    // 类型
    type: {
      type: String,
      default: 'text'
    },

    // 大小
    size: {
      type: String,
      default: undefined,
      validator (val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
    },

    // 前置icon
    prefixicon: {
      type: String,
      default: ''
    },

    // 后置icon
    suffixicon: {
      type: String,
      default: ''
    },

    // 块元素
    block: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

      // 内部值
      innerVal: this.value
    }
  },
  computed: {
    classes () {
      return {
        [`s-input-${this.size}`]: !!this.size,
        [`s-input-block`]: !!this.block,
        's-input_prefix': !!this.$slots.prefix || !!this.prefixicon,
        's-input_suffix': !!this.$slots.suffix || !!this.suffixicon,
        's-input_prepend': !!this.$slots.prepend,
        's-input_append': !!this.$slots.append
      }
    }
  },
  watch: {

    /**
     * 监听value变化
     * @param val 值
     * @param oldVal 旧值
     * @return {boolean}
     */
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return false
      this.innerVal = val
      this.handleValidate()
    }
  },
  methods: {

    handleInput () {
      this.$emit('input', this.innerVal)
      this.handleValidate()
    },

    handleChange ($event) {
      this.$emit('change', $event)
    },

    handleKeyup ($event) {
      this.$emit('keyup', $event)
    },

    handleKeydown ($event) {
      this.$emit('keydown', $event)
    },

    handleFocus ($event) {
      this.$emit('focus', $event)
    },

    handleBlur ($event) {
      this.$emit('blur', $event)
    },

    handleMouseup ($event) {
      this.$emit('mouseup', $event)
    },

    handleMousedown ($event) {
      this.$emit('mousedown', $event)
    },

    handleClick ($event) {
      this.$emit('click', $event)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-input {
    position: relative;
    display: inline-block;
    font-size: $md;

    &-inner {
      border-radius: 3px;
      border: 1px #ddd solid;
      line-height: 1;
      padding: 7px 10px;
      transition: border-color .3s ease;
      width: 100%;

      &:focus:not([readonly]) {
        border-color: $primary;
      }

      &:disabled {
        background-color: #f5f5f5;
        color: rgba(0, 0, 0, .25);
      }

      &[readonly] {
        cursor: default;
      }
    }

    &_prepend,
    &_append {
      line-height: normal;
      display: inline-flex;

      &.s-input-block {
        display: flex;
      }

      .s-input {

        &-inner {
        }
      }
    }

    &-prepend,
    &-append {
      background-color: #f5f7fa;
      color: #909399;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      padding: 0 20px;
      line-height: 34px;
      white-space: nowrap;
    }

    &-prepend {
      border-right: none;
    }

    &-append {
      border-left: none;
    }

    &-prepend,
    &_append > .s-input-inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &-prepend + &-inner,
    &-append {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &_suffix {
      .s-input-inner {
        padding-right: 25px;
      }
    }

    &_prefix {
      .s-input-inner {
        padding-left: 25px;
      }
    }

    &-suffix,
    &-prefix {
      position: absolute;
      top: 0;
      line-height: 36px;
      color: #c0c4cc;
    }

    &-suffix {
      right: 8px;
    }

    &-prefix {
      left: 8px;
    }

    &[type="color"] {
      height: 40px;
    }

    &-block {
      display: block;
    }

    &-lg {
      font-size: $lg;

      &-inner {
        padding: 12px 13px;
      }
    }

    &-sm {
      font-size: $sm;

      &-inner {
        padding: 4.5px 7px;
      }
    }

    &-xs {
      font-size: $xs;

      &-inner {
        padding: 0.5px 3px;
      }
    }
  }
</style>
