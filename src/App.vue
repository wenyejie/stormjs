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
    // const { name, query: { redirect }, fullPath } = this.$route
    // if (this.$root.isLogin) {
    //   if (name === 'login') this.$router.push('/')
    // } else {
    //   if (name !== 'login') {
    //     this.$router.push({
    //       name: 'login',
    //       query: {
    //         redirect: redirect || encodeURI(fullPath)
    //       }
    //     })
    //   }
    // }
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
