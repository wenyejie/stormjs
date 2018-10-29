<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    // 当用户已登录, 并且在登录页时, 自动调回首页, 反正则自动调回登录页
    if (this.$root.isLogin) {
      if (this.$route.name === 'RLogin') this.$router.push('/')
    } else {
      if (this.$route.name !== 'RLogin') {
        this.$router.push({
          name: 'RLogin',
          query: {
            redirect: encodeURI(this.$route.fullPath)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
  #app {
    overflow: hidden;
    min-height: 100%;
    min-height: 100vh;
  }
</style>
