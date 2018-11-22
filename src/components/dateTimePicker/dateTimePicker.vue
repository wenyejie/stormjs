<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/02
 -->
<template>
  <div
    class="s-dateTimePicker"
    @click.stop>
    <s-input
      ref="input"
      v-model="inputVal"
      :readonly="!editable"
      :placeholder="placeholder"
      class="s-dateTimePicker-input"
      block
      @input="handleInput"
      @focus="handleFocus" />
    <s-dropdown
      v-if="visible !== 0"
      v-model="visible"
      class="s-dateTimePicker-inner">
      <s-date
        v-show="mode === 1"
        :max="max"
        :min="min"
        :footer="false"
        v-model="innerVal"
        @input="handleDateInput" />
      <s-time
        v-show="mode === 2"
        v-model="innerVal"
        :visible="mode === 2"
        :footer="false" />
      <s-row
        class="s-dateTimePicker-footer"
        justify="between">
        <s-col align="center">
          <button
            type="button"
            class="s-dateTimePicker-btn"
            @click="handleTime">
            {{ innerVal | date('hh:mm:ss') }}
          </button>
        </s-col>
        <s-col align="center">
          <button
            type="button"
            class="s-dateTimePicker-btn cancel"
            @click="handleCancel">取消
          </button>
          <button
            type="button"
            class="s-dateTimePicker-btn now"
            @click="handleNow">现在
          </button>
          <button
            type="button"
            class="s-dateTimePicker-btn ok"
            @click="handleOk">确定
          </button>
        </s-col>
      </s-row>
    </s-dropdown>
  </div>
</template>

<script>
import date from '../../filters/date'
import datetimeMixin from '../../mixins/datetimeMixin'
import formElementMixins from '../../mixins/formElementMixin'

export default {
  name: 'SDateTimePicker',
  filters: { date },
  mixins: [formElementMixins, datetimeMixin],
  props: {

    // 可编辑?
    editable: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: ''
    },

    format: {
      type: String,
      default: 'YYYY-MM-DD hh:mm:ss'
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
      visible: 0,
      inputVal: '',

      // 模式, 1:日期, 2:时间
      mode: 1
    }
  },
  watch: {
    value (val) {
      this.innerVal = val
    },
    innerVal (val) {
      this.inputVal = date(val, this.format)
    }
  },
  created () {
    this.inputVal = this.value ? date(this.innerVal, this.format) : ''
  },
  methods: {

    handleFocus () {
      this.visible = 1
    },

    // 当输入框被输入时
    handleInput () {
      this.innerVal = this.innerVal ? new Date(this.innerVal) : undefined
      this.$emit('input', this.innerVal)
      this.inputVal = this.innerVal ? date(this.innerVal, this.format) : ''
      this.mode = 1
      this.visible = 2
    },

    handleTimeInput () {
      this.handleInput()
    },

    // 当日期被选择时
    handleDateInput () {
      this.handleInput()
    },

    handleTime () {
      this.mode = 2
      this.oldVal = this.innerVal ? new Date(this.innerVal) : null
    },

    handleCancel () {
      this.innerVal = undefined
      this.handleInput()
    },

    handleNow () {
      this.innerVal = new Date()
      this.handleInput()
    },

    handleOk () {
      if (this.mode === 1) {
        this.handleInput()
      } else if (this.mode === 2) {
        this.mode = 1
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-dateTimePicker {
    display: inline-block;
    vertical-align: middle;
    position: relative;

    &-block {
      display: block;
    }

    &-inner {
      width: 284px;
    }
    &-footer {
      height: 36px;
      display: flex;
      border-top: 1px solid $blackLight;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

      &:not(.s-row-justify-between) {
        justify-content: flex-end;
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
