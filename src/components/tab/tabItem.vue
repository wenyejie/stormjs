<!--
 - tab-item
 -
 - @author: Storm
 - @date: 2018/02/27
 -->
<template>
  <div
    v-show="!hidden ? visible : true"
    v-if="hidden ? visible: true"
    :class="classes"
    class="s-tab-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'STabItem',
  props: {

    // 是否要移除dom
    hidden: {
      type: Boolean,
      default: false
    },

    // name
    name: {
      type: String,
      default: ''
    },

    // 标题
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      firstChosen: true
    }
  },
  computed: {

    // 内部名称
    innerName () {
      return this.name || this._uid
    },
    classes () {
      return {
        's-tab-active': this.innerName === this.$parent.activeName
      }
    }
  },
  watch: {

    /**
     * 监听父元素的uid值
     * @param val
     * @param oldVal
     */
    '$parent.activeName' (val, oldVal) {
      if (val === oldVal) return
      this.visible = val === this.innerName
      if (this.visible) {
        this.$emit('chosen')
        if (this.firstChosen) {
          this.firstChosen = false
          this.$emit('firstChosen')
        }
      }
    }
  },
  mounted () {
    this.$parent.addItem({
      name: this.innerName,
      label: this.label
    })
  },
  beforeDestroy () {
    this.$parent.removeItem(this.innerName)
  }
}
</script>
