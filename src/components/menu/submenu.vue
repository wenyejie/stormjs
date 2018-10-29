<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/13
 -->
<template>
  <ul class="s-submenu">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'SSubmenu'
}
</script>

<style lang="scss">
  .s-submenu {
    display: none;
    .s-menu-item {
      background-color: #252d34;
    }
    .s-menu-link {
      padding-left: 58px;
    }

    & > .s-menu-item {
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
</style>
