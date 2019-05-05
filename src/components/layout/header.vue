<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/09
 -->
<template>
  <header class="header">
    <div class="header-l">
      <button
        type="button"
        class="header-toggle"
        @click="handleToggle">
        <s-icon
          :class="{hidden: asideVisible === 2}"
          type="shouqix" />
      </button>
    </div>
    <div class="header-r">
      <div class="header-info">
        <s-portrait
          :size="32"
          :name="userInfo.loginName"
          class="header-portrait" />
        <span class="header-name">{{ userInfo.loginName }}</span>
        <s-icon
          class="header-down"
          type="jiantoushangx-copy" />
        <ul class="header-info-list">
          <li @click="handleLogout">退出</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { sUserInfo, sUserPermission } from '../../storages'
import logout from '../../apis/logout'

export default {
  name: 'SHeader',
  props: {
    asideVisible: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      userInfo: {
        loginName: ''
      },
      loading: 0
    }
  },
  created () {
    this.userInfo = sUserInfo() || {}
  },
  methods: {

    // 切换侧边栏
    handleToggle () {
      this.$emit('toggle')
    },

    /**
     * 退出登录
     */
    handleLogout () {
      if (this.loading === 1) return
      this.loading = 1
      logout()
        .then(() => {
          this.loading = 2
          // 移除用户信息
          sUserInfo(null)

          // 移除用户权限
          sUserPermission(null)

          this.$message.success('登出成功!')

          this.$router.push({ name: 'rLogin' })
        }, () => {
          this.loading = 3
        })
    }
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    height: 60px;
    padding: 0 24px;
    position: relative;

    &-toggle {
      border: none;
      background: none;
      font-size: 16px;
      padding: 10px 15px;
      margin-left: -15px;
      color: #888;

      .s-icon {
        transition: transform .3s ease-in-out;

        &.hidden {
          transform: rotate(-180deg);
        }
      }
    }

    &-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;

      &-list {
        position: absolute;
        z-index: 2;
        right: 0;
        top: 100%;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
        width: 100%;
        display: none;
        opacity: 0;
        transition: all .3s ease-in-out;

        li {
          height: 45px;
          text-align: center;
          line-height: 45px;
        }
      }

      &:hover &-list {
        display: block;
        opacity: 1;
      }
    }

    &-portrait {
      border-radius: 50%;
      margin-right: 12px;
    }

    &-name {
      margin-right: 8px;
    }

    &-down {
    }
  }
</style>
