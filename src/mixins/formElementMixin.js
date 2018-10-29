/**
 * 表单元素混合注入
 *
 * @author: Storm
 * @date: 2018/08/08
 */

import queryComponentParent from '../utils/queryComponentParent.js'

const defMsg = {

  // 必填提示信息
  required: '{title}不能为空',

  // 选择框必填提示信息
  selectRequired: '请选择{title}',

  // 长度提示信息
  telLength: '{title}必须为11位',

  // 格式验证
  // patternMsg: '${title}格式错误',
  pattern: '请输入正确的{title}{patternmsg}',

  //
  letter: '{title}只能输入字母',

  number: '{title}只能输入数字',

  name: '{title}姓名请填写中文',

  numberMin: '{title}不能小于{min}',

  numberMax: '{title}不能大于{max}',

  minlength: '{title}不能低于{minlength}位',

  maxlength: '{title}不能超过{maxlength}位',

  minZero: '{title}必须大于0'

}

// 验证数据
const valiAry = ['required', 'minlength', 'maxlength', 'pattern', 'max', 'min', 'step']

const assign = (str, obj) => {
  const keys = str.match(/([^{}]+)(?=})/g)
  keys.forEach(key => {
    str = str.replace(new RegExp('\\{' + key + '\\}', 'g'), obj[key])
  })
  return str
}

export default {
  props: {

    disabled: Boolean,

    readonly: Boolean,

    name: String,

    required: Boolean,

    minlength: Number,

    maxlength: Number,

    title: String,

    pattern: {
      type: [String, RegExp],
      default: undefined
    },

    // 正则提示语
    patternmsg: {
      type: String,
      default: undefined
    },

    max: Number,

    min: Number,

    step: Number,

    autocomplete: {
      type: String,
      default: 'on',
      validator (val) {
        return ['on', 'off'].includes(val)
      }
    }
  },
  data () {
    return {
      validity: {
        valid: undefined,
        valueMissing: undefined,
        tooShort: undefined,
        tooLong: undefined,
        patternMismatch: undefined,
        rangeOverflow: undefined,
        rangeUnderflow: undefined,
        stepMismatch: undefined
      }
    }
  },
  computed: {

    isFormElm () {
      if (!this.formParent) return false
      const name = this.formParent.$options.name
      return name === 'SFormItem' || name === 'SForm'
    }
  },
  methods: {
    handleAutoValidate () {
      if (!this.isFormElm || !this.name) return
      this.validity = {
        valueMissing: this.required ? !(Array.isArray(this.innerVal) ? this.innerVal.length : this.innerVal) : false
      }
      this.validity.valid = !this.validity.valueMissing
    },

    /**
     * 表单验证
     */
    handleValidate () {
      const $el = this.$el
      if (!this.isFormElm || !this.name) return
      if (!$el.validity) {
        this.handleAutoValidate()
      }

      const validity = $el.validity || this.validity
      const result = {
        name: this.name,
        title: this.title,
        value: this.innerVal,
        required: this.required,
        minlength: this.minlength,
        maxlength: this.maxlength,
        pattern: this.pattern,
        patternmsg: this.patternmsg ? `,${this.patternmsg}` : '',
        max: this.max,
        min: this.min,
        step: this.step,
        valid: validity.valid,
        invalid: !validity.valid,
        errMsg: '',
        errMsgs: []
      }
      const errResult = {
        requiredErr: validity.valueMissing,
        minlengthErr: validity.tooShort,
        maxlengthErr: validity.tooLong,
        patternErr: validity.patternMismatch,
        maxErr: validity.rangeOverflow,
        minErr: validity.rangeUnderflow,
        stepErr: validity.stepMismatch
      }
      if (result.invalid) {
        for (let i = 0; i <= valiAry.length; i++) {
          if (!errResult[valiAry[i] + 'Err']) continue
          if (!result.errMsg) result.errMsg = assign(defMsg[valiAry[i]], result)
          result.errMsgs.push(assign(defMsg[valiAry[i]], result))
        }
      } else {
        result.errMsg = ''
      }
      this.formParent.handleValidate(Object.assign(result, errResult), 2)
    }
  },

  mounted () {
    this.handleValidate()
  },

  updated () {
    this.handleValidate()
  },

  beforeDestroy () {
    this.formParent && (typeof this.formParent.handleValidate === 'function') && this.formParent.handleValidate()
  },

  created () {
    if (this.$options.name) {
      this.formParent = queryComponentParent(this, ['SForm', 'SFormItem'])
    }
  }
}
