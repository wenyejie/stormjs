<!--
 -
 -
 - @author: Storm
 - @date: 2018/09/14
 -->
<template>
  <div class="s-people">
    <div class="s-people-view">
      <ul class="s-people-view-list">
        <li
          v-for="item in checkedList"
          :key="item.id"
          :title="item[labelKey]"
          class="s-people-view-item">
          <s-portrait
            :name="item[labelKey]"
            class="s-people-view-portrait" />
          <a
            @click="handleClose(item)"
            class="s-people-view-close"
            href="javascript:;" />
        </li>
        <li v-if="readonly === false">
          <button
            type="button"
            class="s-people-add"
            @click="handleToggle" />
        </li>
      </ul>
    </div>
    <s-dropdown
      v-if="readonly === false"
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
            :name="item[labelKey]"
            class="s-people-dropdown-portrait" />
          {{ item[labelKey] }}
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
import { list } from '../../apis/user'

// 获取用户信息
const user = {
  list: [],
  getting: 0,
  callbacks: [],
  listen () {
    this.callbacks.forEach(cb => {
      cb && cb(clone(user.list, true), true)
    })
    delete user.callbacks
  },
  getList () {
    user.getting = 1
    list({ rows: 50, pageNo: 1 })
      .then(response => {
        user.getting = 2
        user.list = response.dataList || []
        this.listen()
      }, () => {
        user.getting = 3
      })
  },
  get (cb) {
    if (user.getting === 2) {
      cb(clone(user.list, true))
      return
    }
    this.callbacks.push(cb)
    if (user.getting === 1) {
      return
    }
    this.getList()
  }
}

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
      default: 'userName'
    },

    // 取值字段
    valueKey: {
      type: [String, null],
      default: 'loginName'
    },

    // 类型
    readonly: {
      type: Boolean,
      default: false
    },

    // 是否有关闭按钮
    hasClose: {
      type: Boolean,
      default: false
    }

    // 展示列表数据
    // list: {
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // }
  },
  data () {
    return {

      innerVal: this.value,

      // 查询字段
      searchKey: '',

      // dropdown可见行
      visible: 0,

      innerList: clone(user.list, true)
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
    }
    // list (val, oldVal) {
    //   if (val === oldVal) return
    //   this.innerList = clone(val, true)
    //   this.init()
    // }
  },
  created () {
    // 初始化默认值
    if (!this.innerVal) {
      this.innerVal = this.multiple ? [] : undefined
    }
    this.getUserList()
    this.init()
  },
  methods: {

    handleClose (item) {
      item.checked = false
      this.handleInput(item)
    },

    // 得到用户列表
    setUserList (list, isAsync) {
      this.innerList = list
      if (isAsync) {
        this.init()
      }
    },

    // 获取用户列表
    getUserList () {
      user.get(this.setUserList)
    },

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
      let tmpChecked = item.checked
      this.$delete(item, 'checked')
      this.$set(item, 'checked', !tmpChecked)
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
        item.checked = false
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

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-people {
    &-view {
      line-height: 1;

      &-list {
        display: flex;
      }

      &-item {
        margin-right: 7px;
        position: relative;

        &:hover .s-people-view-close {
          display: flex;
        }
      }

      &-portrait {
        display: block;
      }

      &-close {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #ccc;
        text-align: center;
        line-height: 12px;
        font-size: 12px;
        color: #fff;
        border-radius: 50%;
        top: -4px;
        right: -4px;
        justify-content: center;
        align-items: center;
        display: none;

        &:after,
        &:before {
          content: '';
          background-color: #fff;
          width: 6px;
          display: block;
          height: 1px;
        }

        &:after {
          transform: rotate(45deg);
          margin-left: -6px;
        }

        &:before {
          transform: rotate(-45deg);
        }
      }
    }

    &-dropdown {
      /*position: absolute;*/
      z-index: 1;
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
