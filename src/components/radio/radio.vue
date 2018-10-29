<!--
 - checkbox
 -
 - author: Storm
 - date: 2017/10/07
 -->

<template>
  <label
    :class="classes"
    class="s-radio">
    <input
      :name="name"
      :checked="checked"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      type="radio"
      class="s-radio-input"
      @click.stop="handleClick($event)"
      @change="handleChange($event)">
    <span class="s-radio-indi" />
    <span class="s-radio-desc"><slot /></span>
  </label>
</template>

<script>
import formElementMixins from '../../mixins/formElementMixin'
import queryComponentParent from '../../utils/queryComponentParent'

export default {
  name: 'SRadio',
  mixins: [formElementMixins],
  props: {
    // 值
    value: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: false
    },

    // 大小
    size: {
      type: String,
      default: ''
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
      checked: null,
      parent: {}
    }
  },
  computed: {
    /**
         * className
         */
    classes () {
      return {
        [`s-radio-block`]: !!this.block,
        [`s-radio-${this.size}`]: !!this.size
      }
    },
    // 判断是否为group
    isGroup () {
      return this.parent.$options && this.parent.$options.name === 'SRadioGroup'
    }
  },
  watch: {
    value (val, oldVal) {
      if (val !== oldVal) {
        this.setChecked()
      }
    },
    'parent.value' (val, oldVal) {
      if (val !== oldVal) {
        this.setChecked()
      }
    }
  },
  created () {
    this.parent = queryComponentParent(this, 'SRadioGroup')
    this.setChecked()
  },
  beforeDestroy () {
    // 如果是group并且被选中, 通知父组件取消该值
    if (this.isGroup && this.checked) {
      this.parent.update(this.value)
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
        this.parent.update(this.value)
      }
      this.$emit('input', this.checked ? this.trueValue : this.falseValue)
      this.$emit('change', $event)
    },
    /**
         * 点击radio
         * @param $event 事件
         */
    handleClick ($event) {
      this.$emit('click', $event)
    },
    /**
         * 设置是否选中
         */
    setChecked () {
      if (this.isGroup) {
        this.checked = this.parent.value === this.value
      } else {
        this.checked = this.value === this.trueValue
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-radio {
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
    &-indi {
      pointer-events: none;
      user-select: none;
      width: 1em;
      height: 1em;
      border: 1px solid $lightGrey;
      border-radius: 50%;
      transition: all .3s ease;
    }
    &-input:checked + &-indi {
      border-color: $primary;
      background-color: $primary;
      position: relative;
      &:before {
        width: .3em;
        height: .3em;
        border-radius: 50%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &-desc {
      margin-left: 8px;
    }
    &-block {
      display: block;
    }

    &-lg {
      .s-radio {
        &-indi {
          width: 18px;
          height: 18px;
        }
      }

      .s-radio-input:checked + .s-radio-indi:before {
        width: 10px;
        height: 10px;
      }
    }
  }
</style>
