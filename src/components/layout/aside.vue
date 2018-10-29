<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/09
 -->
<template>
  <aside
    :class="asideVisible === 2 ? 'aside-simple' : ''"
    class="aside">
    <router-link
      to="/"
      class="aside-logo">
      <img
        src="../../assets/logo.png"
        alt="CMDB平台">
      <span v-show="asideVisible === 1">CMDB平台</span>
    </router-link>
    <nav class="aside-nav">
      <s-menu :simple="asideVisible === 2">
        <template
          v-for="(item, index) in navigates">
          <s-menu-item
            v-if="permission.includes(item.id)"
            :icon="item.icon"
            :name="item.name"
            :title="item.title"
            :visible="item.launch"
            :key="index"
            @toggle="handleToggle(item)">
            <s-submenu v-if="item.children">
              <template v-for="(subitem, subindex) in item.children">
                <s-menu-item
                  v-if="permission.includes(item.id)"
                  :name="subitem.name"
                  :title="subitem.title"
                  :key="subindex"
                  @toggle="handleToggle(subitem)" />
              </template>
            </s-submenu>
          </s-menu-item>
        </template>
      </s-menu>
    </nav>
  </aside>
</template>

<script>
import navigates from '../../datas/navigates'
import { sUserPermission } from '../../storages/'
import encodeURI from '../../utils/encodeURI'

export default {
  name: 'SAside',
  props: {
    asideVisible: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      navigates,
      permission: sUserPermission()
    }
  },
  created () {
    if (!Array.isArray(this.permission) || typeof this.permission[0] !== 'string') {
      this.$router.push({
        name: 'rLogin',
        query: {
          redirect: encodeURI(this.$route.fullPath)
        }
      })
      return
    }
    this.init()
  },
  methods: {
    handleToggle (item) {
      if (item.name) {
        this.$router.push({ name: item.name })
      } else if (item.children) {
        item.launch = item.launch === 1 ? 2 : 1
      }
    },

    init () {
      const name = this.$route.name
      for (let item of navigates) {
        if (item.name === name) item.launch = 1
        if (!item.children) continue
        for (let subitem of item.children) {
          if (subitem.name === name) {
            subitem.launch = 1
            item.launch = 1
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .aside {
    width: 200px;
    background-color: #2f363c;
    transition: width .3s ease-in-out;

    &-simple {
      width: 66px;
    }

    &-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: rgba(255, 255, 255, .8);
      font-size: 16px;
      font-weight: 500;
      height: 60px;
      padding: 0 24px;

      img {
        width: 31px;
      }
      span {
        margin-left: 16.8px;
        @include text-ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
