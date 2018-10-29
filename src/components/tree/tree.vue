<!--
 -
 -
 - @author: Storm
 - @date: 2018/10/12
 -->
<template>
  <ul class="s-tree">
    <s-tree-item
      v-for="(item, index) in list"
      :key="index"
      :data="item"
      v-model="innerVal"
      :item-key="itemKey"
      :render-hidden="renderHidden"
      :label-key="labelKey"
      :value-key="valueKey"
      @input="handleInput"
      @click="handleClick"
      @expansion="handleExpansion" />
  </ul>
</template>

<script>
import STreeItem from './treeItem.vue'

export default {
  name: 'STree',
  components: { STreeItem },
  props: {
    // 被选中的值
    value: {
      type: [String, Number],
      default: ''
    },

    // 数据列表
    list: {
      type: Array,
      default () {
        return []
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
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.innerVal = val
    }
  },
  methods: {

    // 展开子项
    handleExpansion () {
      this.$emit('expansion')
    },

    // 点击子项
    handleClick (item) {
      this.handleInput()
      this.$emit('click', item)
    },

    handleInput () {
      this.$emit('input', this.innerVal)
    }
  }
}
</script>

<style lang="scss">
  .s-tree {

    & .s-tree {
      .s-tree-item-content {
        padding-left: 15px;
      }
      & .s-tree {
        .s-tree-item-content {
          padding-left: 30px;
        }
        & .s-tree {
          .s-tree-item-content {
            padding-left: 45px;
          }

          & .s-tree {
            .s-tree-item-content {
              padding-left: 60px;
            }

            & .s-tree {
              .s-tree-item-content {
                padding-left: 75px;
              }

              & .s-tree {
                .s-tree-item-content {
                  padding-left: 90px;
                }

                & .s-tree {
                  .s-tree-item-content {
                    padding-left: 105px;
                  }
                }

              }

            }

          }
        }
      }
    }
  }
</style>
