<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/05
 -->
<template>
  <div class="s-time">
    <div class="s-time-body">
      <s-time-item
        :list="hours"
        :visible="visible"
        v-model="hour"
        @change="handleHour" />
      <s-time-item
        :list="minutes"
        :visible="visible"
        v-model="minute"
        @change="handleMinute" />
      <s-time-item
        :list="seconds"
        :visible="visible"
        v-model="second"
        @change="handleSecond" />
    </div>
    <div
      v-if="footer"
      class="s-time-footer">
      <button
        type="button"
        class="s-time-btn cancel"
        @click="handleCancel">取消
      </button>
      <button
        type="button"
        class="s-time-btn now"
        @click="handleNow">现在
      </button>
      <button
        type="button"
        class="s-time-btn ok"
        @click="handleOk">确定
      </button>
    </div>
  </div>
</template>

<script>
import isValidDate from '../../utils/isValidDate'
import STimeItem from './timeItem.vue'
import datetimeMixin from '../../mixins/datetimeMixin'

// 获取时间列表
const getTimeList = (max = 59, min = 0) => {
  const result = []
  for (let i = min; i <= max; i++) result.push({ value: i, selected: false, disabled: false })
  return result
}

export default {
  name: 'STime',
  components: { STimeItem },
  mixins: [datetimeMixin],
  props: {
    footer: {
      type: Boolean,
      default: true
    },

    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hours: getTimeList(23),
      minutes: getTimeList(),
      seconds: getTimeList(),

      hour: 0,
      minute: 0,
      second: 0
    }
  },
  created () {
    this.oldValue = this.innerVal
    if (isValidDate(this.innerVal)) {
      this.setVal()
    } else {
      this.hour = 0
      this.minute = 0
      this.second = 0
    }
  },
  methods: {
    handleOk () {
      this.$emit('close')
    },

    // 设置时分秒的值
    setVal (date = this.innerVal) {
      this.hour = date.getHours()
      this.minute = date.getMinutes()
      this.second = date.getSeconds()
    },

    handleCancel () {
      this.handleInput(this.oldValue)
      this.$emit('close')
    },

    handleNow () {
      this.innerVal = new Date()
      this.handleInput()
      this.$emit('close')
    },

    handleInput (val = this.innerVal) {
      this.innerVal = new Date(val)
      this.setVal()
      this.$emit('input', this.innerVal)
    },

    handleHour () {
      this.innerVal.setHours(this.hour)
      this.handleInput()
    },

    handleMinute () {
      this.innerVal.setMinutes(this.minute)
      this.handleInput()
    },

    handleSecond () {
      this.innerVal.setSeconds(this.second)
      this.handleInput()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-time {
    /*width: 180px;*/
    /*margin: 7px 0 0;*/
    /*<!--border: 1px solid $blackLight;-->*/
    /*background-color: #fff;*/
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);*/
    /*border-radius: 2px;*/
    user-select: none;

    &-body {
      display: flex;
      height: 190px;
      position: relative;

      &:after {
        content: '';
        border-top: 1px solid $blackLight;
        border-bottom: 1px solid $blackLight;
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        height: 36px;
        top: 50%;
        margin-top: -18px;
      }
    }

    &-footer {
      height: 36px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid $blackLight;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
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
    }
  }
</style>
