<!--
 - 月份选择器
 -
 - @author: Storm
 - @date: 2018/07/31
 -->
<template>
  <section class="s-datetime">
    <header class="s-datetime-header">
      <button
        class="s-datetime-btn prev"
        @click="handlePrevYear">«
      </button>
      <span
        class="s-datetime-label"
        @click="handleYear">{{ (innerVal || new Date()) | date('YYYY') }}年</span>
      <button
        class="s-datetime-btn next"
        @click="handleNextYear">»
      </button>
    </header>
    <div class="s-datetime-body">
      <table class="s-datetime-table month">
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="index">
            <td
              v-for="subitem in item"
              :class="monthClasses(subitem)"
              :key="subitem.value"
              @click="handleMonth(subitem)">{{ subitem.value | month2cn }}月
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer
      v-if="footer"
      class="s-datetime-footer">
      <button
        type="button"
        class="s-datetime-btn cancel"
        @click="handleCancel">取消
      </button>
      <button
        type="button"
        class="s-datetime-btn now"
        @click="handleNow">现在
      </button>
      <button
        type="button"
        class="s-datetime-btn ok"
        @click="handleOk">确定
      </button>
    </footer>
  </section>
</template>

<script>
import date from '../../filters/date'
import getMonths from './getMonths'
import month2cn from '../../filters/month2cn'
import datetimeMixin from '../../mixins/datetimeMixin'

export default {
  name: 'SMonthPicker',
  filters: { date, month2cn },
  mixins: [datetimeMixin],
  props: {
    footer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      innerVal: this.value,
      list: getMonths(this.value)
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.innerVal = val
    }
  },
  created () {
    this.oldMonth = this.list[(this.innerVal || new Date()).getMonth()]
  },
  methods: {

    handleOk () {
      this.handleInput()
    },

    handleCancel () {
      this.handleInput()
    },

    monthClasses ({ selected }) {
      return { selected }
    },

    handleInput () {
      this.innerVal = new Date(this.innerVal)
      this.$emit('input', this.innerVal)
      this.$emit('mode', 0)
      this.$emit('day')
    },

    handleYear () {
      this.$emit('mode', 2)
      this.$emit('year')
    },

    handlePrevYear () {
      const date = this.innerVal
      const month = date.getMonth()
      date.setFullYear(date.getFullYear() - 1)
      if (date.getMonth() !== month) date.setDate(0)
    },

    handleNextYear () {
      const date = this.innerVal
      const month = date.getMonth()
      date.setFullYear(date.getFullYear() + 1)
      if (date.getMonth() !== month) date.setDate(0)
    },

    handleNow () {
      this.innerVal = new Date()
    },

    handleMonth (subitem) {
      if (this.oldMonth) this.oldMonth.selected = false
      subitem.selected = true
      const date = this.innerVal
      const day = date.getDate()
      date.setMonth(subitem.value)
      if (date.getDate() !== day) date.setDate(0)
      this.oldMonth = subitem
      this.handleInput()
    }

  }
}
</script>

<style lang="scss">
  @import "../../styles/datetime.scss";

  .s-datetime-table.month {
    td {
      padding: 16px 0;
    }
  }
</style>
