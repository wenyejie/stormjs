<!--
 - input
 -
 - @author: Storm
 - @date: 2017/12/22
 -->
<template>
  <input
    :type="type"
    :name="name"
    :title="title"
    v-model="innerVal"
    :class="classes"
    :required="required"
    :readonly="readonly"
    :max="max"
    :min="min"
    :step="step"
    :minlength="minlength"
    :maxlength="maxlength"
    :disabled="disabled"
    :pattern="pattern"
    :patternmsg="patternmsg"
    :autocomplete="autocomplete"
    class="s-input"
    @input="handleInput($event)"
    @change="handleChange($event)"
    @keyup="handleKeyup($event)"
    @keydown="handleKeydown($event)"
    @focus="handleFocus($event)"
    @mouseup="handleMouseup($event)"
    @mousedown="handleMousedown($event)"
    @blur="handleBlur($event)">
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
        [`s-input-block`]: !!this.block
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
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-input {
    position: relative;
    display: inline-block;
    line-height: 1;
    padding: 7px 10px;
    border-radius: 4px;
    border: 1px #ddd solid;
    transition: border-color .3s ease;
    font-size: $md;

    &[type="color"] {
      height: 40px;
    }

    &:focus {
      border-color: $primary;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: rgba(0,0,0,.25);
    }

    /*&[readonly] {
      cursor: default;

      &:focus {
        border-color: $lightGrey;
      }
    }*/

    &-block {
      display: block;
      width: 100%;
    }

    &-lg {
      font-size: $lg;
      padding: 12px 13px;
    }

    &-sm {
      font-size: $sm;
      padding: 4.5px 7px;
    }

    &-xs {
      font-size: $xs;
      padding: 0.5px 3px;
    }
  }
</style>
