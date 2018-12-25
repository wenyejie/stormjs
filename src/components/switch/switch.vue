<!--
 - switch开关
 -
 - @author: Storm
 - @date: 2018/07/27
 -->
<template>
  <label
    :class="classes"
    class="s-switch">
    <input
      :disabled="disabled"
      v-model="innerVal"
      class="s-switch-input"
      type="checkbox"
      @change="handleChange($event)">
    <span class="s-switch-indi" />
  </label>
</template>

<script>
import formElementMixins from '../../mixins/formElementMixin'
export default {
  name: 'SSwitch',
  mixins: [formElementMixins],
  props: {
    value: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: false
    },

    name: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    trueValue: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: true
    },

    falseValue: {
      type: [Boolean, String, Number, Object, Date, Array],
      default: false
    },

    size: {
      type: String,
      default: undefined,
      validator (val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
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
        's-switch-disabled': this.disabled
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.setInnerValue()
    }
  },
  created () {
    this.setInnerValue()
  },
  methods: {
    handleChange ($event) {
      this.handleInput()
      this.$emit('change', $event)
    },

    handleInput () {
      this.$emit('input', this.innerVal ? this.trueValue : this.falseValue)
    },

    setInnerValue () {
      if (this.value === this.trueValue) {
        this.innerVal = true
      } else if (this.value === this.falseValue) {
        this.innerVal = false
      } else {
        this.innerVal = !!this.value
      }
      this.handleInput()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-switch {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    width: 36px;

    &-input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      visibility: hidden;
    }

    &-indi {
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.25);
      transition: background-color 0.1s, border 0.1s;
      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
      }
    }

    &-input:checked + &-indi {
      border-color: #48c673;
      background-color: #48c673;

      &:before {
        transform: translateX(16px);
      }
    }

    &-lg {
      height: 36px;
      width: 60px;

      .s-switch {
        &-indi {
          border-radius: 18px;

          &:before {
            width: 34px;
            height: 34px;
            border-radius: 18px;
          }
        }

        &-input:checked + .s-switch-indi:before {
          transform: translateX(24px);
        }
      }
    }

    &-disabled {
      pointer-events: none;
      opacity: 0.4;
    }
  }
</style>
