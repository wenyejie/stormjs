<!--
 -
 -
 - @author: Storm
 - @date: 2018/09/14
 -->
<template>
  <div
    class="s-people"
    @click.stop>
    <div class="s-people-view">
      <ul class="s-people-view-list">
        <li
          v-for="item in checkedList"
          :key="item.id"
          :title="item.name"
          class="s-people-view-item">
          <s-portrait
            :name="item.name"
            class="s-people-view-portrait" />
        </li>
        <li>
          <button
            type="button"
            class="s-people-add"
            @click="handleToggle" />
        </li>
      </ul>
    </div>
    <s-dropdown
      class="s-people-dropdown"
      v-model="visible">
      <input
        v-model.trim="searchKey"
        class="s-people-input"
        placeholder="搜索用户（支持拼音首字母）">
      <p class="s-people-total">全部联系人（{{ innerList.length }}人）</p>
      <ul class="s-people-dropdown-list">
        <li
          v-for="item in filterList"
          :key="item.id"
          :class="{checked: item.checked}"
          class="s-people-dropdown-item"
          @click="handleSelect(item)">
          <s-portrait
            :name="item.name"
            class="s-people-dropdown-portrait" />
          {{ item.name }}
        </li>
      </ul>
    </s-dropdown>
  </div>
</template>

<script>
import arrayToggle from '../../utils/arrayToggle'
import clone from '../../utils/clone'
import cn2pinyin from '../../utils/cn2pinyin'
import formElementMixin from '../../mixins/formElementMixin'

export default {
  name: 'SPeople',
  mixins: [formElementMixin],
  props: {

    value: {
      type: [Array, String, Number],
      default: undefined
    },

    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },

    // 展示字段
    labelKey: {
      type: String,
      default: ''
    },

    // 取值字段
    valueKey: {
      type: [String, null],
      default: 'loginName'
    },

    // 展示列表数据
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {

      innerVal: this.value,

      // 查询字段
      searchKey: '',

      // dropdown可见行
      visible: 0,

      innerList: clone(this.list)
    }
  },
  computed: {

    // 过滤列表
    filterList () {
      const key = this.searchKey.toLocaleLowerCase()
      // 过滤
      let result = this.innerList.filter(item => {
        const pinyin = cn2pinyin(item.name, { isFirstLetter: true })
        if (key) {
          return pinyin.toLocaleLowerCase().includes(key)
        } else {
          return true
        }
      })

      // 排序
      if (key) {
        return result.sort((item, item1) => {
          const pinyin = cn2pinyin(item.name, { isFirstLetter: true })
          const pinyin1 = cn2pinyin(item1.name, { isFirstLetter: true })
          return pinyin.toLocaleLowerCase().indexOf(key) >
            pinyin1.toLocaleLowerCase().indexOf(key)
        })
      }
      return result
    },

    // 选中的列表
    checkedList () {
      return this.innerList.filter(item => item.checked)
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.innerVal = val
      this.init()
    },
    list (val, oldVal) {
      if (val === oldVal) return
      this.innerList = clone(val)
      this.init()
    }
  },
  created () {
    // 初始化默认值
    if (!this.innerVal) {
      this.innerVal = this.multiple ? [] : undefined
    }

    this.init()
  },
  methods: {

    // 点击
    handleToggle () {
      this.visible = this.visible === 1 ? 2 : 1
    },

    handleInput (item) {
      const value = this.valueKey ? item[this.valueKey] : item
      if (item.checked) {
        if (this.multiple) {
          arrayToggle(this.innerVal, value)
        } else {
          this.innerVal = value
        }
      } else {
        if (this.multiple) {
          arrayToggle(this.innerVal, value)
        } else {
          this.innerVal = ''
        }
      }
      this.$emit('input', this.innerVal)
      this.$emit('change', item)
    },

    handleSelect (item) {
      if (!this.multiple) {
        this.checkedList.forEach(item => {
          item.checked = false
        })
      }
      this.$set(item, 'checked', !item.checked)
      this.handleInput(item)
      if (!this.multiple) {
        this.handleToggle()
      }
    },

    // 初始化
    init () {
      if (
        (Array.isArray(this.innerVal) && this.innerVal.length === 0) ||
        (!Array.isArray(this.innerVal) && !this.innerVal)
      ) {
        return
      }
      const result = this.innerList.filter(item => {
        if (this.multiple) {
          return this.innerVal.includes(item[this.valueKey])
        } else {
          return this.innerVal === item[this.valueKey]
        }
      })

      result.forEach(item => {
        this.$set(item, 'checked', true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/variable.scss";

  .s-people {
    &-view {
      line-height: 1;

      &-list {
        display: flex;
      }

      &-item {
        margin-right: 7px;
      }

      &-portrait {
        display: block;
      }
    }

    &-dropdown {
      /*position: absolute;*/
      /*z-index: 1;*/
      width: 342px;
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.30);
      border-radius: 4px;
      padding: 24px 24px 13px;
      /*margin-top: 8px;*/

      &-list {
        margin: 9px -24px 0;
        overflow-y: auto;
        max-height: 200px;
      }

      &-item {
        line-height: 40px;
        padding: 0 24px;
        cursor: pointer;
        transition: background-color .3s ease-in-out;

        &.checked {
          background: url("../../assets/icon-success.png") no-repeat right 24px center;
          background-size: 12px 8px;
        }

        &:hover {
          background-color: #f3f4f7;
        }
      }

      &-portrait {
        margin-right: 7px;
      }
    }

    &-add {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #6884f3 url("../../assets/icon-add.png") no-repeat center;
      background-size: 12px 12px;
      border: none;
    }

    &-input {
      display: block;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 6.5px 16px;
    }

    &-total {
      margin-top: 16px;
      color: #888;
      line-height: 20px;
    }
  }
</style>
