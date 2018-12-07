<!--
 -
 -
 - @author: Storm
 - @date: 2018-12-07
 -->
<template>
  <div class="s-editor">
    <quill-editor
      class="s-editor-inner"
      ref="editor"
      :options="options"
      @blur="handleBlur"
      @focus="handleFocus"
      @ready="handleReady"
      @change="handleChange"
      @input="handleInput"
      v-model="innerVal" />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import './snow.css'
import formElementMixin from '../../mixins/formElementMixin'

// import 'quill/dist/quill.bubble.css'
// document: https://quilljs.com/docs/quickstart/

const defOpts = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],
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
      ['link', 'image', 'video']
    ]
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
        return { ...defOpts }
      }
    }
  },
  data () {
    return {
      innerVal: this.value
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
    display: flex;
    max-width: 100%;

    &-inner {
      flex: 1;
      overflow: hidden;
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border-color: #ddd;
    }

    .ql-container.ql-snow {
      height: 234px;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      border-color: #ddd;
    }
  }
</style>
