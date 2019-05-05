<!--
 - row
 -
 - author: Storm
 - date: 2017/09/20
 -->

<template>
  <div
    :class="classes"
    :style="styles"
    class="s-row">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SRow',
  props: {
    gutter: {
      type: [Number, String],
      default: 0
    },
    align: {
      type: String,
      default: undefined,
      validator (val) {
        return ['top', 'bottom', 'center', 'stretch'].includes(val)
      }
    },
    justify: {
      type: String,
      default: undefined,
      validator (val) {
        return ['start', 'center', 'end', 'around', 'between', 'evenly'].includes(val)
      }
    },

    wrap: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    classes () {
      return {
        [`s-row-justify-${this.justify}`]: !!this.justify,
        [`s-row-align-${this.align}`]: !!this.align,
        [`s-row-wrap`]: !!this.wrap
      }
    },
    styles () {
      const result = {}
      if (this.gutter) {
        result.marginLeft = '-' + this.gutter + (Number.isFinite(this.gutter) ? 'px' : '')
        result.marginRight = result.marginLeft
      }
      return result
    }
  },
  methods: {}
}
</script>

<style lang="scss">
  .s-row {
    display: flex;

    &-wrap {
      flex-wrap: wrap;
    }

    &-justify-left {
      justify-content: flex-start;
    }

    &-justify-right {
      justify-content: flex-end;
    }

    &-justify-center {
      justify-content: center;
    }

    &-justify-between {
      justify-content: space-between;
    }

    &-justify-around {
      justify-content: space-around;
    }

    &-justify-evenly {
      justify-content: space-evenly;
    }

    &-align-top {
      align-items: flex-start;
    }

    &-align-bottom {
      align-items: flex-end;
    }

    &-align-center {
      align-items: center;
    }

    &-align-stretch {
      align-items: stretch;
    }
  }
</style>
