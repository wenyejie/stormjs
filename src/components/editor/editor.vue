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
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import formElementMixin from '../../mixins/formElementMixin'

// document: https://quilljs.com/docs/quickstart/

console.log(quillEditor)

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
        return Object.create(null)
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

    .ql-container.ql-snow {
      height: 234px;
      border-radius: 3px;
      border: 1px solid #ddd;
    }
  }
</style>
