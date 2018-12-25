<!--
 -
 -
 - @author: Storm
 - @date: 2018-12-07
 -->
<template>
  <div
    :class="classes"
    class="s-editor">
    <quill-editor
      class="s-editor-inner"
      ref="editor"
      :options="options"
      @blur="handleBlur"
      @focus="handleFocus"
      @ready="handleReady"
      @change="handleChange"
      @input="handleInput"
      v-model="innerVal">
      <slot name="toolbar" />
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
import 'quill/dist/quill.core.css'
import './snow.css'
import formElementMixin from '../../mixins/formElementMixin'
import ImageResize from 'quill-image-resize-module'
import clone from '../../utils/clone'
import elOverflowToggle from '../../utils/elOverflowToggle'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/ImageExtend', ImageExtend)

const defOpts = {
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video'],
        ['fullscreen']
      ],
      handlers: {
        'image': function () {
          QuillWatch.emit(this.quill.id)
        },
        'fullscreen': function (e) {
          console.log(e, quillEditor, Quill)
          const $editor = document.querySelector('.s-editor')
          const classList = $editor.classList
          const $btn = $editor.querySelector('.ql-fullscreen')
          if (classList.contains('s-editor-fullscreen')) {
            classList.remove('s-editor-fullscreen')
            $btn.classList.remove('ql-fullscreen-exit')
            elOverflowToggle(false)
          } else {
            classList.add('s-editor-fullscreen')
            $btn.classList.add('ql-fullscreen-exit')
            elOverflowToggle(true)
          }
        }
      }
      // ['showHtml']
    },
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    },
    imageResize: true,
    ImageExtend: {
      loading: true,
      name: 'file',
      action: '/api/file/file/upload',
      response: (res) => {
        return res.data.filePath
      },
      headers: (xhr) => {
        xhr.setRequestHeader('X-zq-from-app', 'zhiqi-file')
      },
      change: (xhr, formData) => {
        formData.append('businessType', 100)
        formData.append('fileName', Date.now())
      }
    }
  },
  placeholder: '在这里插入文本…'
}

export default {
  name: 'SEditor',
  components: { quillEditor },
  mixins: [formElementMixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return clone(defOpts, true)
      }
    }
  },
  data () {
    return {
      innerVal: this.value,

      // 是否全屏
      fullscreen: false
    }
  },
  computed: {
    classes () {
      return {
        's-editor-fullscreen': this.fullscreen
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.innerVal = val
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.innerVal)
    },

    handleBlur ($event) {
      this.$emit('blur', $event)
    },

    handleFocus ($event) {
      this.$emit('focus', $event)
    },

    handleReady ($event) {
      this.$emit('ready', $event)
    },

    handleChange ($event) {
      this.$emit('change', $event)
    }
  }
}
</script>

<style lang="scss">
  .s-editor {
    max-width: 100%;
    background-color: #fff;

    &-fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      z-index: 1024;
    }

    &-inner {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border-color: #ddd;
    }

    .ql-container.ql-snow {
      min-height: 350px;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      border-color: #ddd;
    }
  }
  .ql-container {
    flex: 1;
  }
</style>
