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
        @click="handlePrev">«
      </button>
      <span class="s-datetime-label">{{ list[0][0] }} 年 - {{ list[0][0] + 10 }} 年</span>
      <button
        class="s-datetime-btn next"
        @click="handleNext">»
      </button>
    </header>
    <div class="s-datetime-body">
      <table class="s-datetime-table year">
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
import getYears from './getYears'
import datetimeMixin from '../../mixins/datetimeMixin'

export default {
  name: 'SYearPicker',
  mixins: [datetimeMixin],
  props: {
    isFooter: {
      type: Boolean,
      default: true
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
      this.$emit('month')
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
  @import "../../styles/datetime.scss";
  .s-datetime-table.year {
    td {
      padding: 16px 0;
    }
  }
</style>
