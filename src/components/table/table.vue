<!--
 - table
 -
 - @author: Storm
 - @date: 2017/12/23
 -->
<template>
  <div
    :class="classes"
    class="s-table">
    <table>
      <slot name="table">
        <colgroup v-if="$slots.colgroup">
          <slot name="colgroup" />
        </colgroup>
        <caption v-if="$slots.caption || title">
          <slot name="title">{{ title }}</slot>
        </caption>
        <thead v-if="$slots.head">
          <slot name="head" />
        </thead>
        <tbody v-if="$slots.default">
          <slot />
        </tbody>
        <tfoot v-if="$slots.foot">
          <slot name="foot" />
        </tfoot>
      </slot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'STable',
  props: {

    // 标题
    title: {
      type: String,
      default: ''
    },

    // 是否占满全屏
    block: {
      type: Boolean,
      default: true
    },

    // 是否有边框
    border: {
      type: Boolean,
      default: false
    },

    // 是否展示hover效果
    hover: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: undefined,
      validator (val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
    },

    // 是否展示条纹
    stripe: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    classes () {
      return {
        [`s-table-block`]: !!this.block,
        [`s-table-hover`]: !!this.hover,
        [`s-table-border`]: !!this.border,
        [`s-table-stripe`]: !!this.stripe,
        [`s-table-${this.size}`]: !!this.size
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-table {

    caption {
      padding: 7px 0;
      text-align: left;
      font-size: 22px;
      font-weight: 400;
    }

    td,
    th {
      padding: 5px 16px;
      text-overflow: ellipsis;
      vertical-align: middle;
      transition: all .15s ease-in-out;
    }

    th {
      text-align: left;
      white-space: nowrap;
      font-weight: bold;
    }

    thead th {
      background-color: #f3f4f7;
    }

    &-block {

      table {
        width: 100%;
      }
    }

    &-hover {
      tr:hover > td {
        background-color: #eef1f6 !important;
      }
    }

    &-stripe {
      tr:nth-child(2n) > td {
        background-color: #f3f4f7;
      }
    }

    &-border {
      td, th {
        border: 1px solid #dfe6ec;
      }
    }

    &-btn {
      color: #bdbdbe;

      a {
        margin-left: 12px;
        margin-right: 12px;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &-lg {
      th,
      td {
        padding: 13px 24px;
      }
    }
  }
</style>
