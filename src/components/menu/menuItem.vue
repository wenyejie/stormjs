<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/13
 -->
<template>
  <li
    :class="classes"
    class="s-menu-item">
    <a
      class="s-menu-link"
      @click.prevent="handleClick">
      <slot
        v-if="$slots.icon || icon"
        name="icon">
        <s-icon
          :type="icon"
          class="s-menu-icon" />
      </slot>
      <span class="s-menu-title"><slot name="title">{{ title }}</slot></span>
      <s-icon
        v-if="!name"
        :class="visible === 1 ? 'active' : ''"
        type="jiantoushangx-copy"
        class="s-menu-arrow" />
    </a>
    <slot />
  </li>
</template>

<script>
export default {
  name: 'SMenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classes () {
      return {
        active: this.$route.name === this.name,
        open: this.visible === 1,
        's-submenu-item': this.$parent.$options.name === 'sSubmenu'
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss">
  .s-menu {

    &-link {
      height: 44px;
      line-height: 44px;
      background: no-repeat 18px center;
      background-size: 18px 18px;
      padding-left: 24px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      color: #fff;
      opacity: .6;
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        opacity: 1;
        color: #fff;
      }
    }

    &.simple {
      .s-submenu {
        position: absolute;
        z-index: 2;
        width: 170px;
        right: -170px;
        top: 0;
        display: none;
        padding-left: 10px;
        border-radius: 4px;
        text-align: left;

        .s-menu-link {
          padding: 0 16px;
        }
      }

      &-title,
      .s-menu-item.open > .s-submenu {
        display: none;
      }

      .s-menu-item:hover {
        .s-submenu {
          display: block;

          .s-menu-title {
            display: block;
          }
        }
      }
    }

    &-item {
      position: relative;

      &.open {
        .s-menu-arrow {
          transform: rotateX(180deg);
        }
        .s-submenu {
          display: block;
        }
      }

      &.active > .s-menu-link {
        background-color: #0facf3;
        opacity: 1;
      }
    }

    &-icon {
      font-size: 20px;
      margin-right: 16px;
    }

    &-title {
      flex-grow: 1;
    }

    &-arrow {
      transition: transform .3s ease-in-out;
    }
  }
</style>
