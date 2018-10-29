<!--
 - panel
 -
 - @author: Storm
 - @date: 2017/12/16
 -->
<template>
  <section class="s-panel">
    <slot name="panel">
      <header
        v-if="headerVisible"
        class="s-panel-header">
        <slot name="header">
          <h1
            v-if="$slots.title || title"
            class="s-panel-title">
            <slot name="title">{{ title }}</slot>
          </h1>
        </slot>
      </header>
      <div
        :class="bodyClasses"
        class="s-panel-body">
        <slot />
      </div>
      <footer
        v-if="$slots.footer"
        class="s-panel-footer">
        <slot name="footer" />
      </footer>
    </slot>
  </section>
</template>

<script>
export default {
  name: 'SPanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    padding: {
      type: [Boolean, Number, String],
      default: false
    },

    hasHeader: {
      type: Boolean,
      default: undefined
    }
  },
  computed: {
    /**
         * 头部是否可见
         * @return {boolean}
         */
    headerVisible () {
      return this.hasHeader === undefined ? (!!this.$slots.header || !!this.$slots.title || !!this.title) : this.hasHeader
    },

    bodyClasses () {
      const result = {}
      if (this.padding) {
        result['s-panel-padding'] = true
      } else if (typeof this.padding === 'string') {
        result[`s-panel-padding-${this.padding}`] = true
      }
      return result
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-panel {
    border-radius: 4px;
    background-color: #fff;
    transition: all .3s ease;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);

    & + & {
      margin-bottom: 24px;
    }

    &:not(:first-child) {
      margin-top: 24px;
    }

    &-header,
    &-footer {
      padding: 16px 24px;
    }

    &-header {
      font-size: 16px;
      line-height: 22px;
      border-bottom: 1px solid #eaeefb;
    }

    &-title {
      font-size: 16px;
      line-height: 22px;
    }

    &-body {
      transition: box-shadow .3s ease-in-out;

      &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
      }
    }

    &-padding {
      padding: 24px;
    }

    &-footer {
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
</style>
