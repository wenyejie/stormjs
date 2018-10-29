<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/08
 -->
<template>
  <div
    :class="classes"
    class="s-form-item">
    <p
      v-if="hasLabel"
      class="s-form-label">
      <slot name="label">{{ validator.title }}</slot>
    </p>
    <div class="s-form-content">
      <slot />
      <div
        v-if="errVisible !== 0"
        v-show="errVisible === 1 && validator.errMsg"
        class="s-form-error">
        {{ validator.errMsg }}
      </div>
    </div>
  </div>
</template>

<script>

import queryComponentParent from '../../utils/queryComponentParent.js'

export default {
  name: 'SFormItem',
  props: {
    // 表单标签宽度
    labelWidth: {
      type: [Number, String],
      default: 0
    },
    label: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {

      validator: {}
    }
  },
  computed: {

    // 是否拥有标签
    hasLabel () {
      if (this.label === undefined) {
        return this.isGroup && this.formParent.hasLabel && (this.$slots.label || this.validator.title)
      }
      return this.label
    },

    errVisible () {
      return this.isGroup ? this.formParent.errVisible : 0
    },

    // 判断是否为group
    isGroup () {
      return !!this.formParent
    },

    classes () {
      return {
        's-form-required': !!this.validator.required,
        's-form-horizontal': !!this.isHorizontal
      }
    },

    // 是否水平排列
    isHorizontal () {
      return this.isGroup && this.formParent.direction === 'horizontal'
    }
  },
  beforeDestroy () {
    this.formParent.delItem(this)
  },
  created () {
    this.formParent = queryComponentParent(this, 'SForm')
  },
  methods: {

    handleValidate (result) {
      if (!this.isGroup) return
      if (!this.validator.required) {
        for (let key in result) {
          if (!result.hasOwnProperty(key)) continue
          this.$set(this.validator, key, result[key])
        }
      } else {
        this.validator = Object.assign({}, result)
      }
      this.formParent.handleValidate(result, 1)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-form {
    &-item {
      position: relative;

      &:not(:first-child) {
        margin-top: 24px;
      }
    }

    &-block &-item + .s-form-item {
      margin-top: 24px;
    }

    &-inline &-item {
      margin: 8px;
      display: inline-block;
      vertical-align: middle;
    }

    &-required .s-form-label:after {
      content: "";
      background-color: #ff5e6e;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
    }

    &-content {
      position: relative;
    }

    &-error {
      color: $danger;
      position: absolute;
      bottom: 0;
      line-height: 1;
      font-size: 12px;
      transform: translateY(1.3em);
    }

    &-horizontal {
      display: flex;

      .s-form-label {
        width: 200px;
        text-align: right;
      }

      .s-form-content {
        flex: 1;
      }
    }

  }
</style>
