<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/08
 -->
<template>
  <form
    :class="classes"
    :name="name"
    novalidate
    class="s-form"
    @submit.prevent="handleSubmit($event)">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'SForm',
  props: {

    // form name
    name: {
      type: String,
      default: ''
    },

    // 方向, horizontal: 水平, 默认垂直
    direction: {
      type: String,
      default: ''
    },

    block: {
      type: Boolean,
      default: false
    },

    hasLabel: {
      type: Boolean,
      default: false
    },

    // 验证结果
    value: {
      type: Object,
      default () {
        return {}
      }
    },

    // 触发校验的时候
    trigger: {
      type: String,
      default: 'submit',
      validator (val) {
        return ['submit', 'change', 'input', 'blur'].includes(val)
      }
    }
  },
  data () {
    return {
      errVisible: 0
    }
  },
  computed: {
    classes () {
      return {
        's-form-block': !!this.block,
        's-form-inline': !this.block
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || this.value === val) return
      console.log('form value watch')
      this.innerVal = val
    }
  },
  created () {
    this.innerVal = {}
  },
  methods: {
    validate (callback) {
      this.errVisible = 1
      callback && callback(this.innerVal)
    },

    handleSubmit ($event) {
      if (this.trigger === 'submit') this.validate()
      this.$emit('submit', $event)
    },

    /**
         * 变更表单验证结果
         * @param itemResult 验证结果
         * @param type 类型, 1:formItem, 2:input
         */
    handleValidate (itemResult, type) {
      const result = this.innerVal

      // 当没有参数时, 自动校验全部表单
      if (itemResult) {
        if (!result[itemResult.name]) {
          result[itemResult.name] = {}
        }
        result[itemResult.name] = Object.assign(result[itemResult.name], itemResult)
      }
      const $errMsgs = []
      result.$invalid = false
      for (let key in result) {
        if (!result.hasOwnProperty(key) || !result[key] || result[key].valid || !result[key].name) continue
        result.$invalid = true
        $errMsgs.push(result[key].errMsg)
      }
      result.$valid = !result.$invalid
      result.$errMsgs = $errMsgs
      if (result.$invalid) {
        result.$errMsg = $errMsgs[0]
      } else {
        result.$errMsg = ''
      }

      this.$emit('input', result)
    },

    delItem ($this) {
      const result = this.innerVal
      delete result[$this.validator.name]
      this.handleValidate()
    }
  }
}
</script>

<style lang="scss">
  .s-form {
    font-size: 14px;

    &-label {
      line-height: 36px;
      padding-right: 15px;
    }

    &-inline {
      margin: -8px;
    }
  }
</style>
