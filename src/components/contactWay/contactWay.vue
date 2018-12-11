<!--
 * @Description: 联系方式组件 showvalue 为展示的联系方式 type 为匹配的对应icon 现有规则为['DH', 'DD', 'WX']
 * @Author: Ntfs
 * @Date: 2018-12-10 15:58:44
 * @LastEditors: Ntfs
 * @LastEditTime: 2018-12-11 09:54:13
 -->

<template>
  <div
    class="contact"
    :type="type"
    :showvalue="showvalue">
    <a
      v-if="type==='QQ'"
      target="_blank"
      :href="`http://wpa.qq.com/msgrd?v=3&uin=${showvalue}&site=qq&menu=yes`"
      :style="{'font-size': '14px', 'color': '#444444'}">
      <s-icon
        :size="20"
        color="info"
        :style="{'border-radius': '50%', 'margin-right': '4px'}"
        :type="'qqx'" />
      {{ showvalue }}
    </a>
    <span
      v-else
      :style="{'font-size': '14px', 'color': '#444444'}">
      <s-icon
        :size="20"
        color="info"
        :style="{'border-radius': '50%', 'margin-right': '4px'}"
        :type="icon.indexOf(type) > -1 ? iconFont[icon.indexOf(type)] : 'warning'" />
      {{ showvalue }}
    </span>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SContactWay',
  props: {
    showvalue: {
      type: Number | null | String,
      default: null
    },
    type: {
      type: null | String,
      default: null
    }
  },
  data () {
    return {
      icon: ['DH', 'DD', 'WX'],
      iconFont: ['dianhuax', 'dingdingx', 'weixinx']
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss">
  .contact {
    display: flex;
    // justify-content: center;
    align-items: center;
    padding: 0 2px;
    >a,span {
      display: flex;
      align-items: center;
    }
  }
</style>
