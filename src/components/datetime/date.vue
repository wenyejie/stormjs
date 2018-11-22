<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/05
 -->
<template>
  <div class="s-date">
    <s-day
      v-show="mode === 1"
      :min="min"
      :max="max"
      :footer="footer"
      v-model="innerVal"
      @month="handleMode(2)"
      @year="handleMode(3)"
      @input="handleInput" />
    <s-month
      v-if="isMonth"
      v-show="mode === 2"
      :min="min"
      :max="max"
      :footer="footer"
      v-model="innerVal"
      @day="handleMode(1)"
      @year="handleMode(3)" />
    <s-year
      v-if="isYear"
      v-show="mode === 3"
      :min="min"
      :max="max"
      :footer="footer"
      v-model="innerVal"
      @month="handleMode(2)"
      @year="handleMode(3)" />
    <slot />
  </div>
</template>

<script>
import SDay from './day.vue'
import SMonth from './month.vue'
import SYear from './year.vue'
import datetimeMixin from '../../mixins/datetimeMixin'

export default {
  name: 'SDate',
  components: { SDay, SMonth, SYear },
  mixins: [datetimeMixin],
  props: {
    footer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 模式, 1:day, 2:month, 3: year
      mode: 1,
      isMonth: false,
      isYear: false
    }
  },
  methods: {

    // 改变模式
    handleMode (mode) {
      this.mode = mode
      switch (mode) {
        case 2:
          this.isMonth = true
          break
        case 3:
          this.isYear = true
          break
        default:
          break
      }
    },

    // 输入
    handleInput () {
      this.$emit('input', this.innerVal)
    }
  }
}
</script>

<style lang="scss">

</style>
