<!--
 - radioGroup
 -
 - author: Storm
 - date: 2017/11/05
 -->

<template>
  <div class="s-radio-group">
    <slot />
  </div>
</template>

<script>
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'SRadioGroup',
  mixins: [formElementMixins],
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },
  data () {
    return {
      innerVal: this.value
    }
  },
  watch: {
    value (val) {
      if (val === this.innerVal) return
      this.handleValidate()
    }
  },
  methods: {
    /**
     * 更新group的值
     * @param value 选中的值
     */
    update (value) {
      this.innerVal = value
      this.$emit('input', this.innerVal)
      this.handleValidate()
    }
  }
}
</script>

<style lang="scss">
</style>
