<!--
 -
 -
 - @author: Storm
 - @date: 2018/10/12
 -->
<template>
  <li
    :class="classes"
    class="s-tree-item">
    <div
      :title="data[labelKey]"
      class="s-tree-item-content">
      <button
        type="button"
        class="s-tree-item-triangle"
        @click="handleToggle">
        <i class="s-tree-item-triangle-icon" />
      </button>
      <span
        class="s-tree-item-title"
        @click="handleClick">
        {{ data[labelKey] }}
      </span>
    </div>
    <s-tree
      v-show="data.toggle === 1"
      v-if="isMore"
      v-model="innerVal"
      :list="data[itemKey]"
      :item-key="itemKey"
      :render-hidden="renderHidden"
      :label-key="labelKey"
      :value-key="valueKey"
      @input="handleInput"
      @click="handleTreeClick"
      @expansion="handleExpansion" />
  </li>
</template>

<script>

export default {
  name: 'STreeItem',
  props: {

    // 被选中的值
    value: {
      type: [String, Number],
      default: ''
    },

    // 数据
    data: {
      type: Object,
      default () {
        return {}
      }
    },

    // 子树的节点名称
    itemKey: {
      type: String,
      default: 'children'
    },

    // 是否渲染未展示元素
    renderHidden: {
      type: Boolean,
      default: false
    },

    // 展示的字段, 如果为空则展示为空
    labelKey: {
      type: String,
      default: ''
    },

    // 返回的字段, 如果为空则返回所有属性集合{}
    valueKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerVal: this.value
    }
  },
  computed: {

    // 是否成对
    isGroup () {
      return this.$parent.$options.name === 'STree'
    },

    // 是否有子项
    isMore () {
      return this.data[this.itemKey] && this.data[this.itemKey].length > 0
    },
    classes () {
      const isActive = this.data[this.valueKey] === this.innerVal
      if (isActive) {
        this.$emit('expansion')
      }
      return {
        'toggle': this.data.toggle === 1,
        'active': isActive,
        'noMore': !this.isMore
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.innerVal = val
    },

    innerVal (val, oldVal) {
      if (val === oldVal) return
      this.handleInput()
    }
  },
  methods: {

    // 展开子项
    handleExpansion () {
      this.$set(this.data, 'toggle', 1)
    },

    // 切换
    handleToggle () {
      this.$set(this.data, 'toggle', this.data.toggle === 1 ? 2 : 1)
    },

    handleInput () {
      this.$emit('input', this.innerVal)
    },

    handleTreeClick (item) {
      this.$emit('click', item)
    },

    // 点击
    handleClick () {
      this.$set(this.data, 'active', this.data.active === 1 ? 2 : 1)
      this.innerVal = this.data[this.valueKey]
      this.handleInput()
      this.$emit('click', this.data)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  .s-tree-item {
    line-height: 36px;
    position: relative;

    &-triangle {
      border: none;
      background: none;
      margin-left: 16px;
      padding: 13px 8px;

      &-icon {
        display: block;
        @include triangle-right(#888, 6px, 5px, 5px)
      }
    }

    &.toggle {
      & > .s-tree-item-content > .s-tree-item-triangle {
        transform: rotate(90deg);

        &-icon {
          margin: 0 auto;
        }
      }
    }

    &.active {

      & > .s-tree-item-content {
        background-color: #e1f0f7;
        border-right: 4px solid #0facf3;

        & > .s-tree-item-title {
          pointer-events: none;
          cursor: default;
        }
      }
    }

    &.noMore {
      & > .s-tree-item-content > .s-tree-item-triangle {
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
      }
    }

    &-content {
      display: flex;
      align-items: center;
    }

    &-title {
      @include text-ellipsis;
      display: block;
      flex: 1;
      cursor: pointer;
    }
  }
</style>
