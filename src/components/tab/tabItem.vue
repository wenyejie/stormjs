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
      default: ''
    },

    // 图标
    icon: {
      type: String,
      default: ''
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
    },

    label (val, oldVal) {
      if (val === oldVal) return
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.$parent.removeItem(this.innerName)
  },
  methods: {
    init () {
      this.$parent.addItem({
        name: this.innerName,
        label: this.label,
        icon: this.icon
      })
    }
  }
}
</script>
