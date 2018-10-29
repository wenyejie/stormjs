<!--
 -
 -
 - @author: Storm
 - @date: 2018/07/30
 -->
<template>
  <div
    :class="classes"
    class="s-datePicker"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter">
    <s-input
      v-model="innerFormatVal"
      :block="true"
      :placeholder="placeholder"
      class="s-datePicker-input"
      readonly
      @focus="handleFocus"
      @blur="handleBlur" />
    <div
      v-if="spinnerVisible !== 0"
      v-show="spinnerVisible === 1"
      ref="spinner"
      class="s-datePicker-spinner">
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
      class="s-datePicker-suf" />
  </div>
</template>

<script>
import date from '../../filters/date'
import zeroize from '../../filters/zeroize'
import sDayPicker from './dayPicker.vue'
import sMonthPicker from './monthPicker.vue'
import SYearPicker from './yearPicker.vue'
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'SDatePicker',
  components: { SYearPicker, sDayPicker, sMonthPicker },
  filters: { zeroize, date },
  mixins: [formElementMixins],
  props: {
    value: {
      type: Date,
      default: undefined
    },
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
    },

    // 最大限制日期
    max: {
      type: Date,
      default: undefined
    },

    // 最小限制日期
    min: {
      type: Date,
      default: undefined
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
        's-datePicker-block': !!this.block
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

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-datePicker {
    position: relative;
    color: #606266;
    display: inline-block;
    vertical-align: middle;

    &-block {
      display: block;
    }

    &-suf {
      position: absolute;
      right: 12px;
      top: 50%;
      color: rgba(0, 0, 0, .25);
      transform: translateY(-50%);
      color: #888;
    }

    & > &-input {
      padding-right: 35px;
    }

    &-spinner {
      position: absolute;
      z-index: 2;
      width: 284px;
      top: 36px;
      margin: 7px 0 0;
      border: 1px solid $blackLight;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 2px;
      user-select: none;

      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 15%;
      }

      &:before {
        @include triangle-top($blackLight, 6px, 6px, 6px);

        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
        top: -7px;
      }
      &:after {
        @include triangle-top(#fff, 6px, 6px, 6px);
        top: -6px;
      }
    }

    &-header {
      text-align: center;
      padding: 15px;
      overflow: hidden;

      span {
        font-weight: 500;
        padding: 0 5px;
        cursor: pointer;
      }

      button {
        font-size: 16px;
        padding: 0 7px;
      }
    }

    &-body {
      position: relative;
      padding: 0 15px 5px;
    }

    &-footer {
      height: 36px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid $blackLight;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    &-table {
      width: 100%;
      text-align: center;
      font-size: 12px;

      th, td {
        padding: 8px 0;
      }

      th {
        border-bottom: 1px solid #ebeef5;
      }

      span {
        display: inline-block;
        vertical-align: middle;
        width: 24px;
        height: 24px;
        line-height: 24px;
      }

      td {
        cursor: pointer;
        &:hover:not(.selected):not(.today):not(.other):not(.disabled) {
          color: $primary;
        }

        &.selected {
          color: $primary;
          cursor: not-allowed;
        }

        &.today span {
          background-color: #409eff;
          color: #fff;
          border-radius: 50%;
        }

        &.other {
          color: #c0c4cc;
        }

        &.disabled {
          background-color: #f5f7fa;
          cursor: not-allowed;
          color: #c0c4cc;
        }
      }
    }
    &-btn {
      border: none;
      padding: 0 5px;
      margin: 0 5px;
      cursor: pointer;
      background-color: transparent;
      outline: none;
      font-size: 12px;

      &.ok {
        color: $primaryLight;
      }

      &.cancel {
        color: $lightGrey;
      }

      &.prev {
        float: left;
      }
      &.next {
        float: right;
      }
    }
  }
</style>
