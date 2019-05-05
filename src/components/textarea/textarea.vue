<!--
 - textarea
 -
 - @author: Storm
 - @date: 2018/02/08
 -->
<template>
  <textarea
    :class="classes"
    :style="styles"
    v-model="innerVal"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :title="title"
    :name="name"
    class="s-textarea"
    @input="handleInput"
    @change="handleChange"
    @keyup="handleKeyup"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur" />
</template>

<script>
import adaptiveHeight from '../../utils/adaptiveHeight'
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'STextarea',
  mixins: [formElementMixins],
  props: {
    value: {
      type: String,
      default: ''
    },

    // 块
    block: {
      type: Boolean,
      default: true
    },

    // 高度自适应
    autoRows: {
      type: [Boolean, Object],
      default: false
    }
  },
  data () {
    return {

      // 值
      innerVal: this.value,

      // 高度
      height: 'auto'
    }
  },
  computed: {
    classes () {
      return {
        [`s-textarea-block`]: !!this.block
      }
    },
    styles () {
      const result = {}
      if (this.autoRows) {
        result.height = this.height
      }
      return result
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.innerVal = val
    },
    innerVal (val, oldVal) {
      if (val === oldVal) return
      this.$nextTick(this.handleAutoRows)
    }
  },
  mounted () {
    this.handleAutoRows()
  },
  methods: {
    /**
     * 自动高度
     */
    handleAutoRows () {
      if (!this.autoRows) return
      this.height = adaptiveHeight(this.$el, this.autoRows)
    },

    handleInput () {
      this.$emit('input', this.innerVal)
    },

    handleChange () {
      this.$emit('change')
    },

    handleKeyup ($event) {
      this.$emit('keyup', $event)
    },

    handleKeydown ($event) {
      this.$emit('keydown', $event)
    },

    handleFocus () {
      this.$emit('focus')
    },

    handleBlur () {
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-textarea {
    position: relative;
    display: inline-block;
    line-height: 1.5;
    padding: 7px 10px;
    border-radius: 2px;
    border: 1px #ddd solid;
    transition: border-color .3s ease;
    font-size: $md;

    &-block {
      display: block;
      width: 100%;
    }

    &:focus {
      border-color: $primary;
    }

    &:disabled {
      background-color: #eef1f6;
      border-color: #d1dbe5;
      color: #bbb;
    }

    &[readonly] {
      cursor: default;

      &:focus {
        border-color: $lightGrey;
      }
    }
  }
</style>
