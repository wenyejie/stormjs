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
    <label class="s-upload-label">
      <input
        :multiple="multiple"
        :disabled="disabled"
        :required="required"
        :accept="accept"
        :name="name"
        class="s-upload-input"
        type="file"
        @change="handleChange">
      <slot />
    </label>
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
      list: []
    }
  },
  computed: {
    classes () {
      return {
        's-upload-block': !!this.block
      }
    }
  },
  methods: {

    // 上传
    handleUpload (files) {
      const fd = new FormData()
      fd.append('file', files)
      fd.append('fileName', Date.now())
      fd.append('businessType', 100)
      this.$emit('before', fd)
      upload(fd)
        .then(response => {
          this.$emit('success', response)
        }, (event) => {
          this.$emit('error', event)
        })
        .finally(() => {
          this.$emit('after')
        })

    },

    /**
     * 上传, 可供外部调用
     */
    upload () {
      this.list.forEach(item => {
        this.handleUpload(item)
      })
      this.list = []
    },

    // 变更
    handleChange ($event) {
      const length = $event.target.files.length
      for (let i = 0; i < length; i++) {
        if (this.minlength && this.list.length > this.minlength) {
          this.list.push($event.target.files[i])
        }
      }
      if (this.automatic) {
        this.upload()
      }
      $event.target.value = ''
      this.$emit('input', this.list)
      this.$emit('change', $event.target.files)
    }
  }
}
</script>

<style lang="scss">
  .s-upload {
    display: inline-block;
    vertical-align: middle;

    &-label {
      display: block;
      width: 100%;
      position: relative
    }

    &-input {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }

    &-block {
      display: block;
    }
  }
</style>
