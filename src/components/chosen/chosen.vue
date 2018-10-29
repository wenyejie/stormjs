<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/24
 -->
<template>
  <div
    :class="classes"
    class="s-chosen"
    @click.stop>
    <slot name="prefix" />
    <div
      class="s-chosen-selected"
      @click="handleClick">
      <span
        v-if="multiple ? innerVal.length === 0 : !innerVal"
        class="s-chosen-placeholder">{{ placeholder }}</span>
      <span class="s-chosen-label">{{ label }}</span>
      <ul class="s-chosen-labels">
        <li
          v-for="(item, index) in labels"
          :key="index"
          @click.stop>{{ item }}
          <span
            class="s-chosen-close"
            @click="handleLabelClose(index)">
            <s-icon type="close" />
          </span>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <ul
        v-show="state === 1"
        class="s-chosen-list fade">
        <slot />
      </ul>
    </transition>
    <s-icon
      class="s-chosen-arrow"
      type="down" />
  </div>
</template>

<script>
import arrayToggle from '../../utils/arrayToggle'
import formElementMixin from '../../mixins/formElementMixin'

export default {
  name: 'SChosen',
  mixins: [formElementMixin],
  props: {
    // 块级
    block: {
      type: Boolean,
      default: false
    },

    // 多选
    multiple: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Boolean, Number, Object, Date, Array],
      default: ''
    },

    // 占位符
    placeholder: {
      type: String,
      default: ''
    },

    // 分隔符
    separator: {
      type: String,
      default: ''
    },

    // 是否自适应高度
    autoHeight: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      state: 0,
      innerVal: this.value ? this.value : (this.multiple ? [] : null),
      inputVal: '',
      labels: [],
      label: ''
    }
  },
  computed: {
    classes () {
      return {
        's-chosen-block': this.block,
        's-chosen-multiple': this.multiple,
        'active': this.state === 1,
        's-chosen-auto-height': this.autoHeight,
        's-chosen-disabled': this.disabled
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return

      if (this.multiple && !this.separator && !Array.isArray(val)) {
        throw new Error('多选模式, value值必须是数组类型')
      }

      let newVal
      if (this.separator && this.multiple) {
        newVal = val ? val.split(this.separator) : []
      } else {
        newVal = val
      }
      this.innerVal = newVal
      this.initLabel()
    }
  },
  mounted () {
    if (this.innerVal) this.initLabel()
  },
  created () {
    if (this.multiple && !this.innerVal) {
      this.innerVal = []
    }
  },
  methods: {
    toggle () {
      this.state = this.state === 1 ? 2 : 1
      if (this.state === 1) {
        document.addEventListener('click', () => {
          if (this.state === 1) this.toggle()
        }, { once: true })
      }
    },
    handleClick () {
      if (this.disabled) return
      this.toggle()
    },

    handleLabelClose (index) {
      this.labels.splice(index, 1)
      this.innerVal.splice(index, 1)
      this.handleInput()
    },

    handleInput () {
      let value

      // 如果有分隔符, 并且是多选的, 就把数组分割开, 传到父组件
      if (this.separator && this.multiple) {
        value = this.innerVal.join(this.separator)
      } else {
        value = this.innerVal
      }

      this.$emit('input', value)
      this.$emit('change', { value, label: this.inputVal })
      this.handleAutoValidate()
      this.handleValidate()
    },

    handleItemClick ($item, value) {
      const label = $item.label || $item.$slots.default[0].elm.textContent
      if (this.multiple) {
        arrayToggle(this.innerVal, this.separator ? value + '' : value)
        arrayToggle(this.labels, label)
      } else {
        this.innerVal = value
        this.label = label
        this.toggle()
      }
      this.handleInput()
    },

    // 初始化label
    initLabel () {
      const labels = []
      this.$children.forEach(item => {
        const val = this.separator && this.multiple ? item.value + '' : item.value
        if (item.$options.name === 'SChosenItem' &&
              (this.innerVal === val || this.innerVal.includes(val))
        ) {
          labels.push(item.label || item.$slots.default[0].elm.textContent)
        }
      })

      if (this.multiple) {
        this.labels = labels
      } else if (this.innerVal) {
        this.label = labels[0]
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";
  .s-chosen {
    display: inline-block;
    position: relative;
    font-size: 14px;
    border-radius: 4px;
    min-height: 36px;
    min-width: 130px;
    line-height: 28px;
    border: 1px solid #ddd;
    background-color: #fff;
    transition: all .3s ease-in-out;

    &.active {
      border-color: $primary;
      .s-chosen {
        &-arrow {
          transform: rotate(-0.5turn);
        }
      }
    }

    &:hover {
      border-color: $primary;
    }

    &-block {
      display: block;
    }

    &-selected {
      width: 100%;
      height: 100%;
      min-height: 36px;
      padding: 5px 30px 5px 10px;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      position: relative;
      z-index: 2;
    }

    &-placeholder {
      color: $placeholder;
    }

    &-labels {
      display: flex;
      flex-wrap: wrap;
      margin-top: -3px;

      li {
        background-color: #fafafa;
        border: 1px solid #e8e8e8;
        border-radius: 2px;
        cursor: default;
        margin-right: 4px;
        max-width: 99%;
        position: relative;
        overflow: hidden;
        transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        padding: 0 10px;
        height: 24px;
        line-height: 22px;
        margin-top: 3px;
        white-space: nowrap;
      }
    }

    &-close {
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 1);
      }
    }

    &-input {
    }

    &-list {
      position: absolute;
      z-index: 3;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      background-color: #fff;
      width: 100%;
      margin-top: 3px;
    }

    &-arrow {
      position: absolute;
      color: #888;
      right: 8px;
      top: 10px;
      transition: all .3s ease-in-out;
    }

    &-disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: .4;
    }
  }
</style>
