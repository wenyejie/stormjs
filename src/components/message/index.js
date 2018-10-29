/**
 *
 *
 * @author: Storm
 * @date: 2018/02/24
 */

/**
 * message
 *
 * @author: Storm
 * @date: 2018/01/20
 */

import Vue from 'vue'
import props2string from '../../utils/props2string'

// vm实例
let vmInstance

let id = 0

/**
 * 新建一个实例
 * @param opts 参数
 * @return {Object}
 */
const newInstance = (opts) => {
  const props = props2string(opts)
  const el = document.createElement('div')
  el.id = 's-message-' + ++id
  el.innerHTML = `<s-message${props} v-model="visible" @ok="handleOk" @cancel="handleCancel"></s-message>`
  document.body.appendChild(el)

  const vm = new Vue({
    el,
    data () {
      return Object.assign({}, { visible: false }, opts)
    },
    methods: {

      handleOk () {
        this.ok()
        this.remove()
      },

      handleCancel () {
        this.cancel()
        this.remove()
      },

      /**
       * 移除组件
       */
      remove () {
        setTimeout(this.destroy, 151)
      },

      /**
       * 摧毁组件
       */
      destroy () {
        this.$destroy()
        vmInstance = null
        // @ts-ignore
        document.querySelector(`#${el.id}`).remove()
      },
      ok () {
      },
      cancel () {
      }
    }
  })

  return {

    /**
     * 展示组件
     * @param opts 选项
     */
    show (opts) {
      Object.keys(opts).forEach(key => {
        vm[key] = opts[key]
      })
      vm.visible = true
    },

    /**
     * 移除组件
     */
    remove () {
      vm.visible = false
      vm.remove()
    }
  }
}

const getInstance = (opts) => {
  vmInstance = vmInstance || newInstance(opts)
  return vmInstance
}

/**
 * 初始化实例
 * @param text 文本
 * @param opts 选项
 * @return {Promise<>}
 */
const initInstance = (text = '', opts = {}) => {
  opts.content = text
  return new Promise((resolve, reject) => {
    const vm = getInstance(opts)
    opts.ok = resolve
    opts.cancel = reject
    vm.show(opts)
  })
}

Vue.prototype.$message = {
  success: (text, opts) => {
    opts = Object.assign({
      name: 'success',
      type: 'success'
    }, opts)
    return initInstance(text, opts)
  },

  info: (text, opts) => {
    opts = Object.assign({
      name: 'info',
      type: 'info'
    }, opts)
    return initInstance(text, opts)
  },

  danger: (text, opts) => {
    opts = Object.assign({
      name: 'danger',
      type: 'danger'
    }, opts)
    return initInstance(text, opts)
  },

  warning: (text, opts) => {
    opts = Object.assign({
      name: 'warning',
      type: 'warning'
    }, opts)
    return initInstance(text, opts)
  }
}

export default () => import('./message.vue')
