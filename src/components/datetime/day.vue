<!--
 -
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
      <button
        class="s-datetime-btn prev"
        @click="handlePrevMonth">‹
      </button>
      <span
        class="s-datetime-label"
        @click="handleYear">{{ (innerVal || new Date()) | date('YYYY') }}年</span>
      <span
        class="s-datetime-label"
        @click="handleMonth">{{ (innerVal || new Date()) | date('M') }}月</span>
      <button
        class="s-datetime-btn next"
        @click="handleNextYear">»
      </button>
      <button
        class="s-datetime-btn next"
        @click="handleNextMonth">›
      </button>
    </header>
    <div class="s-datetime-body">
      <table class="s-datetime-table day">
        <thead>
          <tr>
            <th
              v-for="item in weeks"
              :key="item">{{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="index">
            <td
              v-for="subitem in item"
              :class="dayClasses(subitem)"
              :key="subitem.value"
              @click="handleDay(subitem)"><span>{{ subitem.value }}</span>
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
        @click="handleToday">今天
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
import getDays from './getDays'
import datetimeMixin from '../../mixins/datetimeMixin'

export default {
  name: 'SDay',
  filters: { date },
  mixins: [datetimeMixin],
  props: {
    weeks: {
      type: Array,
      default () {
        return ['日', '一', '二', '三', '四', '五', '六']
      },
      validator: val => val.length === 7
    },
    footer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      innerVal: this.value,
      list: null
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.innerVal) return
      this.innerVal = val
    },

    min (val, oldVal) {
      if (val === oldVal) return
      this.buildDays()
    },

    max (val, oldVal) {
      if (val === oldVal) return
      this.buildDays()
    }
  },
  created () {
    this.buildDays()
  },
  methods: {

    /**
     * 点击月份变更模式
     */
    handleMonth () {
      this.$emit('mode', 1)
      this.$emit('month')
    },

    /**
     * 点击年份变更模式
     */
    handleYear () {
      this.$emit('mode', 2)
      this.$emit('year')
    },

    /**
     * 点击上一年按钮
     */
    handlePrevYear () {
      const date = this.innerVal || new Date()
      const day = date.getDate()

      date.setFullYear(date.getFullYear() - 1)

      if (date.getDate() !== day) date.setDate(0)

      this.innerVal = new Date(date)
      this.buildDays()
    },

    /**
     * 点击上一月事件
     */
    handlePrevMonth () {
      const date = this.innerVal || new Date()
      const day = date.getDate()
      date.setMonth(date.getMonth(), 0)
      if (day < date.getDate()) date.setDate(day)
      this.innerVal = new Date(date)
      this.buildDays()
    },

    /**
     * 点击下一年事件
     */
    handleNextYear () {
      const date = this.innerVal || new Date()
      const day = date.getDate()

      date.setFullYear(date.getFullYear() + 1)

      if (date.getDate() !== day) date.setDate(0)

      this.innerVal = new Date(date)
      this.buildDays()
    },

    /**
     * 点击下个月按钮
     */
    handleNextMonth () {
      const date = this.innerVal || new Date()
      const day = date.getDate()
      date.setMonth(date.getMonth() + 2, 0)
      const newDay = date.getDate()
      if (day < newDay) date.setDate(day)
      // this.innerVal = new Date(date)
      this.buildDays()
    },

    /**
     * 天数的样式
     * @param selected 是否选中
     * @param other 是否是其它月份
     * @param disabled 是否禁用
     * @param today 是否今天
     */
    dayClasses ({ selected, other, disabled, today }) {
      return { other, disabled, today, selected }
    },

    /**
     * 点击天数
     * @param subitem
     */
    handleDay (subitem) {
      const date = this.innerVal || new Date()
      if (subitem.disabled || subitem.selected) return
      if (!subitem.other) {
        date.setDate(subitem.value)
      } else {
        date.setMonth(date.getMonth() + (subitem.prev ? -1 : 1), subitem.value)
        this.buildDays()
      }
      subitem.selected = true
      this.innerVal = new Date(date)
      if (this.oldDays) this.oldDays.selected = false
      this.oldDays = subitem
      this.handleInput()
    },

    handleInput () {
      this.$emit('input', this.innerVal)
      this.oldValue = this.innerVal
    },

    /**
     * 构建月份天数
     */
    buildDays () {
      this.list = getDays(this.innerVal, { min: this.min, max: this.max })
      const week = this.list.find(item => item.find(subitem => subitem.selected))
      if (week) this.oldDays = week.find(item => item.selected)
    },

    /**
     * 取消方法, 移除当前选中
     */
    handleCancel () {
      this.innerVal = this.oldValue
      this.handleInput()
    },

    /**
     * 选中今天
     */
    handleToday () {
      this.innerVal = new Date()
      this.handleInput()
    },

    /**
     * 确定方法
     */
    handleOk () {
      this.handleInput()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/datetime.scss";
</style>
