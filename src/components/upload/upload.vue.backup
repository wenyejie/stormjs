<!--
 -
 -
 - @author: Storm
 - @date: 2018/10/24
 -->
<template>
  <div
    :class="classes"
    class="s-upload">
    <div
      @click="handleClick"
      class="s-upload-label">
      <input
        :multiple="multiple"
        :disabled="disabled"
        :required="required"
        :accept="accept"
        :name="name"
        ref="input"
        class="s-upload-input"
        type="file"
        @change="handleChange">
      <slot />
    </div>
    <ul
      v-if="mode !== 'default'"
      class="s-upload-list">
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="`is-${item.status}`"
        class="s-upload-item">
        {{ item.name }}
        <span
          @click="handleRemove(item, index)"
          class="s-upload-remove">×</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { upload } from '../../apis/upload'
import isPositiveInteger from '../../utils/isPositiveInteger'

export default {
  name: 'SUpload',
  props: {

    block: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Object, Array],
      default: undefined
    },

    // 模式, default: 默认, list: 列表, image: 图片, image-list: 图标列表
    mode: {
      type: String,
      default: 'default',
      validator (val) {
        return ['default', 'text-list', 'card', 'card-list'].includes(val)
      }
    },

    // 是否拖拽上传
    drag: {
      type: Boolean,
      default: false
    },

    // 是否自动提示错误信息
    remind: {
      type: Boolean,
      default: true
    },

    // 上传成功返回的有值文件地址对象字段
    valueKey: {
      type: String,
      default: 'filePath'
    },

    // 表单名称
    name: {
      type: String,
      default: undefined
    },

    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },

    // 是否允许重复上传 默认不允许
    repeat: {
      type: Boolean,
      default: false
    },

    repeatField: {
      type: Array,
      default () {
        return ['name']
      }
    },

    // 是否必须
    required: {
      type: Boolean,
      default: false
    },

    // 允许上传图片类型
    accept: {
      type: String,
      default: undefined
    },

    // 选完文件之后自动上传
    automatic: {
      type: Boolean,
      default: true
    },

    // 最小个数, 0即为不限制, 只有为多选时才有效
    minlength: {
      type: Number,
      default: 0,
      validator (val) {
        return isPositiveInteger(val)
      }
    },

    // 最大个数, 0即为不限制, 只有为多选时才有效
    maxlength: {
      type: Number,
      default: 0,
      validator (val) {
        return isPositiveInteger(val)
      }
    },

    // 最小质量, 0即为不限制, 针对每个文件
    minsize: {
      type: Number,
      default: 0,
      validator (val) {
        return isPositiveInteger(val)
      }
    },

    // 最大质量, 0即为不限制, 针对每个文件
    maxsize: {
      type: Number,
      default: 0,
      validator (val) {
        return isPositiveInteger(val)
      }
    },

    // 总计最大质量, 0即为不限制, 针对所有文件总和
    limitSize: {
      type: Number,
      default: 0,
      validator (val) {
        return isPositiveInteger(val)
      }
    }
  },
  data () {
    return {
      // 文件列表
      list: [],
      innerVal: this.multiple ? (this.value || []) : (this.value || '')

    }
  },
  computed: {
    classes () {
      return {
        's-upload-block': !!this.block,
        [`s-upload-${this.mode}`]: this.mode
      }
    }
  },
  methods: {

    /**
     * 点击表单元素
     * @return {void}
     */
    handleClick () {
      this.$refs.input.click()
    },

    /**
     * 移除文件
     * @description 移除文件并执行钩子
     * @param item {File} 被移除的文件
     * @param index {Number} 文件下标
     * @return {void}
     */
    handleRemove (item, index) {
      this.$emit('beforeRemove', item, index)
      this.list.splice(index, 1)
      this.$emit('afterRemove', item)
    },

    /**
     * 上传文件单个文件
     * @param {File} file 被上传的文件
     * @return {void}
     */
    handleUpload (file) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('fileName', Date.now())
      fd.append('businessType', 100)
      this.$emit('uploadBefore', fd)
      upload(fd)
        .then(response => {
          if (this.multiple) {
            this.innerVal.push(response[this.valueKey])
          } else {
            this.innerVal = response[this.valueKey]
          }
          file.status = 'success'
          this.$emit('input', this.innerVal)
          this.$emit('uploadSuccess', response)
        }, (event) => {
          file.status = 'error'
          this.$emit('uploadError', event)
          this.handleError('upload', event.message, event)
        })
        .finally(() => {
          this.$emit('uploadAfter')
        })

    },

    /**
     * 信息错误
     * @description 发生错误后者不符合规定
     * @param {String} errType 错误类型
     * @param {String} errMsg 提示信息
     * @param {String?} errInfo 其它信息
     * @return {void}
     */
    handleError (errType, errMsg, errInfo) {
      if (this.remind) {
        this.$message.warning(errMsg)
      }
      this.$emit('error', errType, errMsg, errInfo)
    },

    /**
     * 执行上传错误
     * @description 可供外部调用 example: this.$refs.elem.submit()
     * @return {void}
     */
    submit () {
      if (this.minlength && this.minlength > this.list.length) {
        this.handleError('minlength', `上传文件不能小于${this.minlength}个`)
        return
      }
      this.list
        .filter(item => item.status === 'wait')
        .forEach(item => this.handleUpload(item))
    },

    // 变更
    handleChange ($event) {
      const length = $event.target.files.length
      for (let i = 0; i < length; i++) {
        if (this.maxlength && this.list.length > this.maxlength) {
          break
        }
        const file = $event.target.files[i]

        // 判断文件是否重复
        if (!this.repeat && this.list.length) {
          const isRepeat = this.list.find(item => {
            return file.name === item.name
          })
          if (isRepeat) {
            this.handleError('repeat', `${file.name}文件重复`)
            continue
          }
        }
        file.status = 'wait'
        this.list.push(file)
      }
      if (this.automatic) {
        this.submit()
      }
      $event.target.value = ''
      this.$emit('change', $event.target.files)
    }
  }
}
</script>

<style lang="scss">
  .s-upload {

    &-label {
      display: block;
      width: 100%;
      position: relative;
      cursor: pointer;
    }

    &-input {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      width: 0;
      height: 0;
    }

    &-block {
      display: block;
    }
  }
</style>
