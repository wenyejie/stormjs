<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/09
 -->
<template>
  <section class="login">
    {{ msg }}
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  // 消息
  msg: string;
}

export default Vue.extend({
  name: 'VLogin',
  data (): Data {
    return {
      msg: 'Hello World!'
    }
  },
  created () {
    if (this.msg) {
      console.log('....')
    } else {
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss">
@import url(../styles/variable.scss);
.login {
  background-image: linear-gradient(224deg, #3583f4 0%, #3213a7 100%);
  min-height: 100vh;

  &-content {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  &-header {
    border-bottom: 1px solid rgba(92, 127, 255, 0.54);

    .login-content {
      height: 71px;
      display: flex;
      align-items: center;
    }
  }

  &-logo {
    width: 35px;
    height: 30px;
    margin-right: 8px;
  }

  &-title {
    font-size: 20px;
    color: #fff;
  }

  &-main {
    .login-content {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 388px;
      height: calc(100vh - 151px);
      background: url("../assets/login-bg.png") no-repeat 0 center;
      background-size: 476px auto;
    }
  }

  &-panel {
    width: 388px;
    padding: 40px 32px;
    background-color: #fff;
    border-radius: 4px;
    position: relative;
    z-index: 1;

    h1 {
      font-size: 22px;
      line-height: 24px;
      color: #333;
      font-weight: normal;
      text-align: center;
    }
  }

  &-prompt {
    margin-top: 18px;
    line-height: 20px;
    color: #888;
    text-align: center;
  }

  &-footer {
    background-color: rgba(0, 37, 105, 0.2);
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
