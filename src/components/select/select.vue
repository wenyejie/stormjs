<!--
 - select
 -
 - @author: Storm
 - @date: 2018/01/18
 -->
<template>
  <select
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :title="title"
    :name="name"
    v-model="innerVal"
    :class="classes"
    class="s-select"
    @change="handleChange">
    <slot />
  </select>
</template>

<script>
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'SSelect',
  mixins: [formElementMixins],
  props: {

    value: {
      type: [String, Boolean, Number, Object, Date, Array],
      default: undefined
    },

    // 大小
    size: {
      type: String,
      default: undefined,
      validator (val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
    },

    // 是否为块级元素
    block: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerVal: this.value
    }
  },
  computed: {
    classes () {
      return {
        [`s-select-${this.size}`]: !!this.size,
        [`s-select-block`]: !!this.block
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.innerVal = val
    }
  },
  methods: {
    handleChange () {
      this.$emit('input', this.innerVal)
      this.$emit('change', this.innerVal)
      this.handleValidate()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-select {
    display: inline-block;
    vertical-align: middle;
    line-height: 1.5;
    padding: 6.5px 36px 6.5px 12px;
    border-radius: 4px;
    border: 1px #ddd solid;
    transition: border-color .3s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1klEQVQ4T92TMW7CQBBF//cNcooUaeAUSKSI0nIMCmbtSLQe+wJpI2gAiRMgECgp0uQaXAJZP1oJI0gMBXRsObvv7ejPLnHj4o087kng7htJ/TRNfy7lUhTFo6SpmbVJ6pBBnuevAD6SJOmY2XeTZA9/ARiGEN7jmZMQ95KRpG6WZZ/HEnd/ArA+hv8JYiFKSI5JvpjZMtbKsmxVVbUi+VbfXMsbx+juz5JmJHuStiQXANK/cGMHtTlKAMwl7UgOmuCLgrjp7h0ADyGEybnJ3NNLvPZX/gLXzFERrIKwMwAAAABJRU5ErkJggg==') no-repeat right 11px center;
    background-size: 12px;

    &[disabled] {
      border-color: #d1dbe5;
      color: #bbb;
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='rgb(187,187,187)' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
    }

    &-block {
      display: block;
      width: 100%;
    }

    &-lg {
      font-size: $lg;
      padding: 8px 26px 8px 16px;
      background-position: right 6px center;
      background-size: 12px;
    }

    &-sm {
      font-size: $sm;
      padding: 4.5px 16px 4.5px 9px;
      background-position: right 4px center;
      background-size: 8px;
    }

    &-xs {
      font-size: $xs;
      padding: 1.5px 12px 1.5px 3px;
      background-position: right 3px center;
      background-size: 6px;
    }

    &[multiple] {
      padding-right: 10px;
      background-image: none;
    }
  }
</style>
