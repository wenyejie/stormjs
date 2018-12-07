<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/09
 -->
<template>
  <div class="s-layout">
    <s-aside :aside-visible="asideVisible" />
    <div class="s-content">
      <s-header
        :aside-visible="asideVisible"
        @toggle="handleToggle" />
      <div class="s-body">
        <slot name="left" />
        <main class="s-main">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import sAside from './aside.vue'
import sHeader from './header.vue'

export default {
  name: 'SLayout',
  components: { sAside, sHeader },
  data () {
    return {
      asideVisible: 1,
      userInfo: {}
    }
  },
  methods: {
    handleToggle () {
      this.asideVisible = this.asideVisible === 1 ? 2 : 1
    }
  }
}
</script>

<style lang="scss">
  .s-layout {
    display: flex;
    align-items: stretch;
    min-height: 100vh;
  }
  .s-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .s-main {
    padding: 24px;
    flex: 1;
    overflow: hidden;

    &-t {
      padding: 24px 0;
    }

    &-c {
    }
  }
  .s-body {
    display: flex;
    flex: 1;
    align-content: stretch;
  }
</style>
