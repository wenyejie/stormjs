<!--
 -
 -
 - @author: Storm
 - @date: 2018/07/30
 -->
<template>
  <div
    :class="classes"
    class="s-datetime"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter">
    <s-input
      v-model="innerFormatVal"
      :block="true"
      :placeholder="placeholder"
      class="s-datetime-input"
      readonly
      @focus="handleFocus"
      @blur="handleBlur" />
    <div
      v-if="spinnerVisible !== 0"
      v-show="spinnerVisible === 1"
      ref="spinner"
      class="s-datetime-spinner">
      <s-day-picker
        v-show="mode === 0"
        v-if="isDayVisible"
        v-model="innerVal"
        :min="min"
        :max="max"
        :weeks="weeks"
        @mode="handleMode($event)"
        @input="handleDayInput" />

      <s-month-picker
        v-show="mode === 1"
        v-if="isMonthVisible"
        :min="min"
        :max="max"
        v-model="innerVal"
        @mode="handleMode($event)" />

      <s-year-picker
        v-show="mode === 2"
        v-if="isYearVisible"
        :min="min"
        :max="max"
        v-model="innerVal"
        @mode="handleMode($event)" />
    </div>
    <s-icon
      type="calendar"
      class="s-datetime-suf" />
  </div>
</template>

<script>
import date from '../../filters/date'
import sDayPicker from '../datetime/day.vue'
import sMonthPicker from '../datetime/month.vue'
import SYearPicker from '../datetime/year.vue'
import formElementMixins from '../../mixins/formElementMixin'
import datetimeMixin from '../../mixins/datetimeMixin'

export default {
  name: 'SDatePicker',
  components: { SYearPicker, sDayPicker, sMonthPicker },
  filters: { date },
  mixins: [formElementMixins, datetimeMixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },

    weeks: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六']
    },

    placeholder: {
      type: String,
      default: ''
    },

    block: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerVal: this.value,

      spinnerVisible: 0,

      // 是否显示日期选择
      isDayVisible: false,

      // 是否显示月份选择
      isMonthVisible: false,

      // 是否显示年份选择
      isYearVisible: false,

      // 模式 0: 天数, 1: 月份, 2: 年份
      mode: 0
    }
  },
  computed: {
    innerFormatVal () {
      return date(this.innerVal, this.format)
    },
    classes () {
      return {
        's-datetime-block': !!this.block
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.innerVal = val
    },
    innerVal () {
      this.handleValidate()
    },

    spinnerVisible (val) {
      console.log(val)
    }
  },
  methods: {

    handleDayInput () {
      this.$emit('input', this.innerVal)
      this.removeSpinner(true)
      this.handleValidate()
    },

    /**
     * 变更模式
     */
    handleMode (mode) {
      this.mode = mode
      switch (mode) {
        case 0:
          this.isDayVisible = true
          break
        case 1:
          this.isMonthVisible = true
          break
        case 2:
          this.isYearVisible = true
          break
        default:
          break
      }
    },

    /**
     * 移除面板
     */
    removeSpinner (isForce) {
      if (this.leave || isForce) {
        this.spinnerVisible = 2
        this.$refs.spinner.style.top = ''
      }
    },

    // 失去焦点
    handleBlur () {
      this.removeSpinner()
    },

    /**
     * 输入框获取焦点事件
     */
    handleFocus () {
      this.handleShow()
    },

    // 移出鼠标
    handleMouseLeave () {
      this.leave = true
    },

    handleMouseEnter () {
      this.leave = false
    },

    handleShow () {
      this.mode = 0
      this.isDayVisible = true
      this.spinnerVisible = 1
      this.$nextTick(() => {
        const { top, height } = this.$refs.spinner.getBoundingClientRect()
        const clientHeight = document.documentElement.clientHeight
        if (top + height > clientHeight) {
          this.$refs.spinner.style.top = `${clientHeight - top - height + 36}px`
        } else {
          this.$refs.spinner.style.top = ''
        }
      })
    }
  }
}
</script>
