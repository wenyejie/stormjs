<!--
 - 月份选择器
 -
 - @author: Storm
 - @date: 2018/07/31
 -->
<template>
  <section class="s-datePicker-content">
    <header class="s-datePicker-header">
      <button
        class="s-datePicker-btn prev"
        @click="handlePrev">«</button>
      <span class="s-datePicker-label">{{ list[0][0] }} 年 - {{ list[0][0] + 10 }} 年</span>
      <button
        class="s-datePicker-btn next"
        @click="handleNext">»</button>
    </header>
    <div class="s-datePicker-body">
      <table class="s-datePicker-table year">
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="index">
            <td
              v-for="subitem in item"
              :key="subitem.value"
              @click="handleYear(subitem)">{{ subitem }}年
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="s-datePicker-footer">
      <button
        type="button"
        class="s-datePicker-btn cancel"
        @click="handleCancel">取消
      </button>
      <button
        type="button"
        class="s-datePicker-btn now"
        @click="handleNow">现在
      </button>
      <button
        type="button"
        class="s-datePicker-btn ok"
        @click="handleOk">确定
      </button>
    </footer>
  </section>
</template>

<script>
import getYears from './getYears'

export default {
  name: 'SYearPicker',
  props: {
    value: {
      type: Date,
      default: undefined
    },
    min: {
      type: Date,
      default: undefined
    },
    max: {
      type: Date,
      default: undefined
    }
  },
  data () {
    return {
      innerVal: this.value,
      list: getYears(this.value)
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.innerVal = val
      this.list = getYears(val)
    }
  },
  methods: {

    handleOk () {
      this.handleInput()
    },

    handleCancel () {
      this.handleInput()
    },

    handleInput () {
      this.innerVal = new Date(this.innerVal)
      this.$emit('input', this.innerVal)
      this.$emit('mode', 1)
    },

    handlePrev () {
      const date = this.innerVal
      const month = date.getMonth()
      date.setFullYear(date.getFullYear() - 10)
      if (date.getMonth() !== month) date.setDate(0)
      this.list = getYears(date)
    },

    handleNext () {
      const date = this.innerVal
      const month = date.getMonth()
      date.setFullYear(date.getFullYear() + 10)
      if (date.getMonth() !== month) date.setDate(0)
      this.list = getYears(date)
    },

    handleNow () {
      this.innerVal = new Date()
    },

    handleYear (subitem) {
      const date = this.innerVal
      const day = date.getDate()
      date.setFullYear(subitem)
      if (date.getDate() !== day) date.setDate(0)
      this.oldValue = date
      this.handleInput()
    }

  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-datePicker-table.year {
    td {
      padding: 16px 0;
    }
  }
</style>
