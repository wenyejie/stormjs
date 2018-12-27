<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/24
 -->
<template>
  <div
    :class="classes"
    class="s-chosen">
    <div
      class="s-chosen-inner"
      @click="toggleSpinner">
      <ul class="s-chosen-tags">
        <li
          v-for="item in selectedList"
          :key="item._uid"
          class="s-chosen-tag">{{ item.label }}
        </li>
        <li
          v-if="placeholder"
          v-show="selectedList.length === 0"
          class="s-chosen-placeholder">{{ placeholder }}</li>
      </ul>
    </div>
    <s-dropdown
      class="s-chosen-dropdown"
      v-model="spinner">
      <ul class="s-chosen-list">
        <slot />
      </ul>
    </s-dropdown>
  </div>
</template>

<script>
import formElementMixin from '../../mixins/formElementMixin'
import arrayToggle from '../../utils/arrayToggle'

export default {
  name: 'SChosen',
  mixins: [formElementMixin],
  props: {

    // 值
    value: {
      type: [String, Number, Object, Array],
      default: undefined
    },

    // 只读
    readonly: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    },

    // 模式
    mode: {
      type: String,
      default: 'text'
    },

    type: {
      type: String,
      default: 'input',
      validator (val) {
        return ['input', 'button'].includes(val)
      }
    },

    // 分隔符
    separator: {
      type: String,
      default: undefined
    },

    // 占位符
    placeholder: {
      type: String,
      default: undefined
    },

    // 多选
    multiple: {
      type: Boolean,
      default: false
    },

    // 是否有指示箭头
    arrow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

      innerVal: this.value,

      // 下拉列表
      spinner: 2,

      // 列表
      list: [],

      // 被选中的列表
      selectedList: []
    }
  },
  computed: {
    classes () {
      return {
        'is__multiple': this.multiple,
        [`s-chosen-${this.mode}`]: this.mode,
        [`s-chosen-${this.type}`]: this.type,
        'is__readonly': this.readonly,
        'is__disabled': this.disabled,
        'is__block': this.block
      }
    }
  },
  watch: {
    value (val) {
      if (val === this.innerVal) return
      this.initialize()
    },

    list () {
      if (this.value.length) {
        this.initialize()
      }
    }
  },
  methods: {

    handleInput () {
      let value
      const valueList = this.selectedList.map(item => item.value)
      if (this.multiple) {
        if (this.separator) {
          value = valueList.join(this.separator)
        } else {
          value = valueList
        }
      } else {
        value = valueList.length > 0 ? valueList[0] : undefined
      }

      this.innerVal = value

      this.$emit('input', value)
      this.$emit('change', value)
    },

    /**
     * 查找子项
     * @description 通过_uid查找子项
     * @param _uid {Number} _uid
     * @return {Object|Null} 对象
     */
    findItem (_uid) {
      if (this.list.length <= 0) return null
      return this.list.find(item => item._uid === _uid)
    },

    /**
     * 切换子项
     * @param _uid 子项_uid
     * @return {void}
     */
    toggleItem (_uid) {

      // 只读模式, 禁止修改值
      if (this.readonly) return

      // 如果不是多选则需要取消原有选项
      if (!this.multiple) {
        this.selectedList.forEach(item => {
          item.selected = false
        })
        this.selectedList = []
      }
      const item = this.findItem(_uid)
      item.selected = !item.selected
      arrayToggle(this.selectedList, item)
      this.handleInput()
    },

    /**
     * 切换下拉选项
     * @return {void}
     */
    toggleSpinner () {
      this.spinner = this.spinner === 2 ? 1 : 2
    },

    /**
     * 添加子元素
     * @param {Object} item 子元素
     * @return {void}
     */
    handleAdd (item) {
      const children = this.findItem(item._uid)
      const label = item.label || item.$slots.default[0].elm.textContent
      const value = item.value

      // 已经存在改值则更新
      if (children) {
        children.value = value
        children.label = label
        return
      }

      // 否则新增
      this.list.push({
        _uid: item._uid,
        value,
        label,
        selected: false
      })
    },

    /**
     * 根据_uid移除子项
     * @param _uid {Number} _uid
     * @return {void}
     */
    handleRemove (_uid) {
      const index = this.list.findIndex(item => item._uid === _uid)
      if (index >= 0 && this.list.length > 0) {
        this.list.splice(index, 1)
      }
    },

    /**
     * 对值进行初始化
     */
    initialize () {
      this.selectedList = []
      let valueList
      if (this.multiple) {
        if (this.value === 'string') {
          valueList = this.value.split(this.separator || ',')
        } else {
          valueList = this.value
        }
      } else {
        valueList = [this.value]
      }

      valueList.forEach(value => {
        const selected = this.list.find(item => item.value === value)
        if (selected) {
          selected.selected = true
          this.selectedList.push(selected)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-chosen {
    user-select: none;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.4285714285714286;

    &.is__block {
      display: block;
    }

    &-inner {
      border-radius: 3px;
      border: 1px #ddd solid;
      height: 36px;
      padding: 8px 32px 8px 10px;
      min-width: 170px;
      background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1klEQVQ4T92TMW7CQBBF//cNcooUaeAUSKSI0nIMCmbtSLQe+wJpI2gAiRMgECgp0uQaXAJZP1oJI0gMBXRsObvv7ejPLnHj4o087kng7htJ/TRNfy7lUhTFo6SpmbVJ6pBBnuevAD6SJOmY2XeTZA9/ARiGEN7jmZMQ95KRpG6WZZ/HEnd/ArA+hv8JYiFKSI5JvpjZMtbKsmxVVbUi+VbfXMsbx+juz5JmJHuStiQXANK/cGMHtTlKAMwl7UgOmuCLgrjp7h0ADyGEybnJ3NNLvPZX/gLXzFERrIKwMwAAAABJRU5ErkJggg==") no-repeat right 10px center;
      background-size: 12px auto;
    }

    &-input {
      cursor: pointer;
    }

    &-dropdown {
      width: 100%;
    }

    &-tags {
      display: flex;
      align-items: center;
    }

    &-text {
      .s-chosen {
        &-tag {
          &:not(:first-child):before {
            content: '\3001';
          }
        }
      }
    }

    &-tag {
    }

    &-placeholder {
      color: $placeholder;
    }
  }
</style>
