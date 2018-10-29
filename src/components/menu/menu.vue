<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/13
 -->
<template>
  <ul
    :class="classes"
    class="s-menu">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'SMenu',
  props: {
    simple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return {
        'simple': !!this.simple
      }
    }
  }
}
</script>

<style lang="scss">
  .s-menu {

    &.simple {
      .s-menu {
        &-arrow,
        &-title {
          display: none;
        }
      }
    }
  }
</style>
