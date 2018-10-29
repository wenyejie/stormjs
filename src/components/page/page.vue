<!--
 - page
 -
 - @author: Storm
 - @date: 2018/03/16
 -->
<template>
  <div
    :class="classes"
    class="s-page">
    <ul>
      <li
        v-if="hasInfo"
        class="s-page-info">
        <template v-if="totalSize">共{{ totalSize }}条;&nbsp;</template>
        <template v-if="innerPageSize">每页{{ innerPageSize }}条;&nbsp;</template>
        第{{ current + 1 }}页; 共{{ innerTotalPage }}页;
      </li>
      <li
        v-if="hasFirst"
        :class="{disabled: current === 0}"
        class="s-page-item"
        @click="togglePage(0)">{{ firstText }}
      </li>
      <li
        v-if="hasPrev"
        :class="{disabled: current === 0}"
        class="s-page-item"
        @click="togglePage(current - 1)">{{ prevText }}
      </li>
      <li
        v-if="hasPrevSizer"
        class="s-page-sizer s-page-item"
        @click="handleSizer(1)">&hellip;
      </li>
      <template v-if="hasItem">
        <li
          v-for="item in list"
          :class="{disabled: current === item, active: current === item}"
          :key="item"
          class="s-page-item"
          @click.prevent="togglePage(item)">{{ item + 1 }}
        </li>
      </template>
      <li
        v-if="hasNextSizer"
        class="s-page-sizer s-page-item"
        @click="handleSizer(2)">&hellip;
      </li>
      <li
        v-if="hasNext"
        :class="{disabled: current === innerTotalPage - 1}"
        class="s-page-item"
        @click="togglePage(current + 1)">{{ nextText }}
      </li>
      <li
        v-if="hasLast"
        :class="{disabled: current === innerTotalPage - 1}"
        class="s-page-item"
        @click="togglePage(innerTotalPage - 1)">{{ lastText }}
      </li>
      <li
        v-if="hasPageSize"
        class="s-page-size">
        <s-select
          :size="size"
          v-model="innerPageSize"
          @change="handlePageSize">
          <option :value="10">10 条/页</option>
          <option :value="20">20 条/页</option>
          <option :value="30">30 条/页</option>
          <option :value="50">50 条/页</option>
          <option :value="100">100 条/页</option>
          <option :value="200">200 条/页</option>
        </s-select>
      </li>
      <li
        v-if="hasElevator"
        class="s-page-elevator">
        跳至
        <input
          :max="innerTotalPage"
          :min="1"
          :step="1"
          v-model.number="tier"
          type="number"
          @keyup.enter="startElevator"
          @change="startElevator">页
      </li>
    </ul>
  </div>
</template>

<script>

/**
 * 向上取整, 对按钮数的对半
 * @param num 按钮数
 * @return {number}
 */
const countHalf = (num) => Math.ceil(num / 2)

/**
     * 根据参数起始值, 和结束值计算分页列表
     * @param start
     * @param end
     * @return {Array}
     */
const countList = (start, end) => {
  const list = []
  for (; start < end; start++) {
    list.push(start)
  }
  return list
}

/**
     * 生成分页列表
     * @param current 当前页
     * @param total 总页数
     * @param number 按钮数量
     */
const generateList = (current, total, number) => {
  // 起始页, 结束页
  let start = 0
  let end = total

  const half = countHalf(number)

  // 如果总页数低于按钮数
  if (total <= number) {
    end = total
  } else if (current < half) { // 按钮数的前几页
    end = number
  } else if (total <= current + half) { // 倒数几页
    start = total - number
  } else { // 默认情况
    start = current + 1 - half
    end = current + half
  }

  return countList(start, end)
}

/**
     * 数字验证规则
     * @param val
     * @return {boolean}
     */
const validator = (val) => val >= 0

export default {
  name: 'SPage',
  props: {

    name: {
      type: String,
      default: 'page'
    },

    // 当前页数
    value: {
      type: Number,
      default: 0
    },

    // 总页数
    totalPage: {
      type: Number,
      default: 0,
      validator
    },

    // 总条数
    totalSize: {
      type: Number,
      default: 0,
      validator
    },

    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
      validator
    },

    hasPageSize: {
      type: Boolean,
      default: false
    },

    // 按钮数量
    number: {
      type: Number,
      default: 5,
      validator
    },

    // 尺寸
    size: {
      type: String,
      default: undefined,
      validator (val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
    },

    // 禁用, 例如: 当正在加载时
    disabled: {
      type: Boolean,
      default: false
    },

    // 是否有跳转功能
    hasElevator: {
      type: Boolean,
      default: false
    },

    // 筛选器
    hasSizer: {
      type: Boolean,
      default: false
    },

    // 是否有信息
    hasInfo: {
      type: Boolean,
      default: false
    },

    // 是否有页码子项
    hasItem: {
      type: Boolean,
      default: true
    },

    // 是否有下一页
    hasNext: {
      type: Boolean,
      default: true
    },

    // 是否有上一页
    hasPrev: {
      type: Boolean,
      default: true
    },

    // 下一页文本
    nextText: {
      type: String,
      default: '>'
    },

    // 上一页文本
    prevText: {
      type: String,
      default: '<'
    },

    // 是否有第一页
    hasFirst: {
      type: Boolean,
      default: true
    },

    // 第一页文本
    firstText: {
      type: String,
      default: '\u00AB'
    },

    // 是否有最后一页
    hasLast: {
      type: Boolean,
      default: true
    },

    // 最后一页文本
    lastText: {
      type: String,
      default: '\u00BB'
    },

    align: {
      type: String,
      default: undefined,
      validator (val) {
        return ['left', 'center', 'right'].includes(val)
      }
    }
  },
  data () {
    return {

      // 展示分页列表
      list: [],

      // 当前页
      current: this.value,

      // 按钮数的对半向上取值
      half: countHalf(this.number),

      // 层级
      tier: 1,

      // 每页条数
      innerPageSize: this.pageSize
    }
  },
  computed: {

    innerTotalPage () {
      if (Number.isInteger(this.totalPage) && this.totalPage !== 0) {
        return this.totalPage
      } else if (this.totalSize > 0 && this.pageSize > 0) {
        return Math.ceil(this.totalSize / this.pageSize)
      }
      return 0
    },

    // 是否显示上一个筛选器
    hasPrevSizer () {
      return this.hasSizer && (this.list[0]) > 0
    },

    // 是否显示下一个筛选器
    hasNextSizer () {
      return this.hasSizer && (this.list[this.number - 1]) < this.totalPage - 1
    },

    classes () {
      return {
        [`s-page-disabled`]: this.disabled,
        [`s-page-${this.size}`]: !!this.size,
        [`s-page-${this.align}`]: !!this.align
      }
    }
  },
  watch: {

    // 监听value是否发生变化
    value (val) {
      if (!Number.isSafeInteger(val)) return
      this.current = val
      this.buildList()
    },

    // 监听按钮数是否发生变化
    number (val, oldVal) {
      if (val === oldVal) return
      this.half = countHalf(val)
      this.buildList()
    },

    pageSize (val, oldVal) {
      if (val === oldVal) return
      this.innerPageSize = val
    },

    innerTotalPage () {
      this.buildList()
    }
  },
  created () {
    this.buildList()
  },
  methods: {

    /**
         * pageSize变更
         */
    handlePageSize () {
      if (this.disabled) return

      this.$emit('change', this.innerPageSize)
    },

    /**
         * 启动电梯
         */
    startElevator () {
      if (this.disabled) return

      this.tier = Math.ceil(this.tier)
      if (this.tier <= 0) {
        this.tier = 1
      } else if (this.tier > this.innerTotalPage) {
        this.tier = this.innerTotalPage
      }
      this.togglePage(this.tier - 1)
    },

    /**
         * 生成列表
         * @param opts 选项
         */
    buildList (opts = {}) {
      if (this.innerTotalPage === 0 || !Number.isInteger(this.innerTotalPage)) return
      const { total, current, number } = Object.assign({
        total: this.innerTotalPage,
        current: this.current,
        number: this.number
      }, opts)

      this.list = generateList(current, total, number)
    },

    /**
         * 切换筛选器
         * @param type 类型 1:prev, 2:next
         */
    handleSizer (type) {
      if (this.disabled) return

      // 起始值, 结束值
      let start = 0
      let end = this.innerTotalPage
      if (type === 1) {
        end = this.list[0]
        start = this.list[0] - this.number
      } else if (type === 2) {
        start = this.list[this.number - 1] + 1
        end = start + this.number
        if (end >= this.innerTotalPage) {
          end = this.innerTotalPage
        }
      }

      this.list = countList(start, end)
    },

    /**
         * 点击切换页面
         */
    togglePage (page) {
      if (this.disabled) return

      // 如果页码小于0或者大于总页数, 或者等于当前页退出函数
      if (page < 0 || page >= this.innerTotalPage || page === this.current) return false
      this.current = page

      this.$emit('input', page)
      this.$emit('change', page)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-page {
    font-family: Arial;
    display: flex;

    &-center {
      justify-content: center;
    }

    &-right {
      justify-content: flex-end;
    }

    &-left {
      justify-content: flex-start;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li:not(:last-child) {
      margin-right: 10px;
    }

    &-item,
    &-elevator input {
      height: 34px;
      line-height: 32px;
      min-width: 34px;
      padding: 0 5px;
      text-align: center;
      border-radius: 3px;
      color: #666;
      border: 1px solid #dddee1;
    }

    &-item {
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:not(.disabled):hover {
        border-color: $primary;
      }

      &.disabled {
        cursor: not-allowed;
        color: #ccc;
      }

      &.active {
        background-color: $primary;
        color: $white
      }
    }

    &-sizer {
      font-family: serif;
    }

    & &-elevator {
      border: none;
      padding: 0 0 0 5px;
    }

    &-elevator {
      input {
        margin: 0 10px;
        width: 58px;
      }
    }

    &-info {
      line-height: 28px;
    }

    &-disabled {
      cursor: not-allowed;
      position: relative;

      &:before {
        position: absolute;
        content: '';
        @include absolute-center;
        background-color: rgba(255, 255, 255, .5);
      }
    }

    &-sm {
      .s-page {

        &-item,
        &-elevator input {
          height: 28px;
          line-height: 26px;
          min-width: 28px;
          padding: 0 3px;
        }

        &-elevator input {
          width: 48px;
        }
      }

      li {
        margin-right: 8px;
      }
    }

    &-xs {
      .s-page {

        &-item,
        &-elevator input {
          height: 22px;
          line-height: 20px;
          min-width: 22px;
          padding: 0 2px;
        }

        &-elevator input {
          width: 38px;
        }
      }
      li {
        margin-right: 5px;
      }
    }
  }
</style>
