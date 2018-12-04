/**
 *
 *
 * @author: Storm
 * @date: 2018-12-03
 */

import isTrue from '../../utils/isTrue'
import './tab.scss'

export default {
  name: 'STab',
  render (h) {
    const $this = this
    const li = this.list.map(item => {
      return h('li', {
        class: item.name === $this.activeName ? 's-tab-active' : '',
        staticClass: 's-tab-nav-item',
        on: {
          click () {
            $this.toggle(item)
          }
        }
      }, item.label)
    })
    const nav = h('ul', {
      staticClass: 's-tab-nav'
    }, li)
    const content = h('div', {
      staticClass: 's-tab-content'
    }, this.$slots.default)
    let children
    if (this.position === 'right' || this.position === 'bottom') {
      children = [content, nav]
    } else {
      children = [nav, content]
    }
    return h('div', {
      'class': this.classes,
      staticClass: 's-tab'
    }, children)
  },
  props: {

    // 所在
    value: {
      type: [Number, String],
      default: 0
    },

    // 方向
    position: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },

    // 是否要移除DOM
    hidden: {
      type: Boolean,
      default: false
    },

    // 名称
    name: {
      type: String,
      default: 'tab'
    },

    // 主题
    type: {
      type: String,
      default: ''
    },

    // 对齐方式
    align: {
      type: String,
      default: 'start',
      validator (val) {
        return ['start', 'center', 'end'].includes(val)
      }
    },

    // padding
    padding: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      list: [],
      activeName: undefined
    }
  },
  computed: {
    classes () {
      return {
        [`s-tab-${this.position}`]: !!this.position,
        [`s-tab-${this.type}`]: !!this.type,
        's-tab-padding': isTrue(this.padding)
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.toggle({ name: val })
    }
  },
  methods: {

    /**
     * 切换
     * @param item
     * @return {undefined}
     */
    toggle (item) {
      if (this.activeName === item.name) return
      this.activeName = item.name
      this.$emit('input', item.name)
    },

    /**
     * 增加子项
     * @param item
     */
    addItem (item) {
      this.list.push(item)
      if (this.list.length === 1) {
        this.toggle(item)
      }
    },

    /**
     * 移除子项
     * @param name
     */
    removeItem (name) {
      const index = this.list.findIndex(item => item.name === name)

      this.list.splice(index, 1)
      if (this.list.length <= 0) {

      }
    }
  }
}
