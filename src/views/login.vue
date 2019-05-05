<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/09
 -->
<template>
  <section class="login">

    <header class="login-header">
      <div class="login-content">
        <img
          class="login-logo"
          src="../assets/logo.png"
          alt="CMDB平台">
        <span class="login-title">CMDB平台</span>
      </div>
    </header>

    <main class="login-main">
      <div class="login-content">
        <section class="login-panel">
          <h1>欢迎登录</h1>
          <s-form
            v-model="loginV"
            block
            class="mt-24"
            @submit="handleSubmit">
            <s-form-item>
              <s-input
                v-model="login.loginName"
                :minlength="2"
                :maxlength="20"
                block
                required
                name="loginName"
                title="用户名"
                size="lg"
                placeholder="请输入用户名" />
            </s-form-item>

            <s-form-item>
              <s-input
                v-model="login.password"
                :minlength="2"
                :maxlength="20"
                block
                required
                name="password"
                title="密码"
                type="password"
                size="lg"
                placeholder="密码" />
            </s-form-item>

            <s-form-item>
              <s-checkbox
                v-model="rememberMe"
                block>记住我
              </s-checkbox>
            </s-form-item>

            <s-form-item>
              <s-button
                :loading="logging === 1"
                type="info"
                native-type="submit"
                size="lg"
                block>登 录
              </s-button>
            </s-form-item>
          </s-form>
          <p class="login-prompt">忘记密码或申请账号请联系管理员</p>
        </section>
      </div>
    </main>
    <footer class="login-footer">杭州智麒科技有限公司© 2017-2018 zhiqicloud.com 版权所有 ICP证：浙B2-20170817</footer>
  </section>
</template>

<script>
// import login from '../apis/login'
// import md5 from '../cores/md5'
// , sUserInfo, sUserPermission
import { sLoginInfo } from '../storages'
// import decodeURI from '../utils/decodeURI'

export default {
  name: 'VLogin',
  data () {
    return {

      // login form data
      login: {
        loginName: '',
        password: ''
      },
      loginV: {},
      logging: 0,
      rememberMe: true,
      loginInfo: {}
    }
  },
  created () {
    // 读取已保存的用户名
    this.loginInfo = sLoginInfo()
    if (this.loginInfo) {
      this.login = Object.assign({}, this.loginInfo)
    }

    // 重定向地址
    this.redirect = this.$route.query.redirect || '/'
  },
  methods: {
    handleSubmit () {
      if (this.loginV.$invalid || this.logging === 1) return
      this.$router.push('/')
      // this.logging = 1
      // const params = Object.assign({}, this.login)
      // if (!this.loginInfo || this.loginInfo.password !== params.password) {
      //   params.password = md5(params.password)
      // }
      // login(params)
      //   .then((response) => {
      //     this.logging = 2
      //     // 记住/移除登录名
      //     sLoginInfo(this.rememberMe ? params : null)
      //
      //     const permission = []
      //     response.funList.forEach(item => {
      //       permission.push(item.funCode)
      //       item.childFunList && item.childFunList.forEach(item => {
      //         permission.push(item.funCode)
      //       })
      //     })
      //
      //     delete response.funList
      //
      //     // 保存用户权限
      //     sUserPermission(permission)
      //
      //     // 保存用户信息
      //     sUserInfo(response)
      //
      //     this.$root.userInfo = response
      //
      //     // 当有重定向地址时, 跳至重定向地址
      //     if (this.redirect) {
      //       location.href = decodeURI(this.redirect)
      //     } else {
      //       this.$router.push('/')
      //     }
      //   }, () => {
      //     this.logging = 3
      //   })
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/variable.scss";
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
      background-color: rgba(0, 37, 105, .2);
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: rgba(255, 255, 255, .6);
    }
  }
</style>
