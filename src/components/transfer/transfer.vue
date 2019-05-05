<!--
 * @Description: file content
 * @Author: Ntfs
 * @LastEditors: Ntfs
 * @Date: 2019-03-06 10:50:07
 * @LastEditTime: 2019-03-06 16:16:19
 -->

<template>
  <ul class="transferBox">
    <li class="transferList">
      <h4>全部人员</h4>
      <div class="transferContent">
        <div class="transferSearch">
          <s-icon
            type="iconhetongx"
            class="searchIcon" />
          <s-input
            v-model="searchValue"
            @keydown.enter='search' />
          <s-button
            type="info"
            @click="search">搜索
          </s-button>
        </div>
        <ul class="origin">
          <li
            v-for="(item, index) of originData"
            :key="index"
            :title="`${item.name} - ${item.job}`"
            @click="selectItem(item, index)">
            <span class="symbol">{{ item.name[0] }}</span>
            {{ item.name }} - {{ item.job }}
          </li>
        </ul>
      </div>
    </li>
    <li class="transferIcon">
      <s-icon type="iconshouqijiantoux" />
    </li>
    <li class="transferList">
      <h4>已选择({{ selectData.length }})</h4>
      <div class="transferContent">
        <ul class="select">
          <li
            v-for="(item, index) of selectData"
            :key="index">
            <p :title="`${item.name} - ${item.job}`">
              <span class="symbol">{{ item.name[0] }}</span>
              {{ item.name }} - {{ item.job }}
            </p>
            <span
              @click="removeSelect(item, index)">X</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'STransfer',
  props: {
    originValue: {
      type: Array,
      default: () => []
    },
    selectValue: {
      type: Array,
      default: () => []
    },
    filterKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      backupOri: [],
      originData: [],
      selectData: [],
      searchValue: ''
    }
  },
  computed: {},
  watch: {
    originValue (newValue, oldValue) {
      this.backupOri = [...newValue]
      this.originData = [...newValue]
      this.selectData = [...this.selectValue]
    },
    selectValue (newValue, oldValue) {
      this.backupOri = [...this.originValue]
      this.originData = [...this.originValue]
      this.selectData = [...newValue]
    }
  },
  mounted () {

  },
  methods: {
    search () {
      if (this.searchValue && this.searchValue !== 0) {
        let backupOri = [...this.backupOri]
        backupOri = backupOri.filter((value, key) => {
          let tmp = this.filterKey ? value[this.filterKey] : value
          return tmp.indexOf(this.searchValue) !== -1
        })
        this.originData = [...backupOri]
      } else {
        let backupOri = [...this.backupOri]
        this.originData = [...backupOri]
      }
    },
    selectItem (item, index) {
      let originData = [...this.originData]
      let selectData = [...this.selectData]
      let backupOri = [...this.backupOri]
      backupOri = backupOri.filter((value, key) => {
        return value !== item
      })
      originData.splice(index, 1)
      selectData.push(item)
      this.originData = [...originData]
      this.selectData = [...selectData]
      this.backupOri = [...backupOri]
      this.$emit('changeSelect', {
        originData,
        selectData
      })
    },
    removeSelect (item, index) {
      let originData = [...this.originData]
      let selectData = [...this.selectData]
      let backupOri = [...this.backupOri]
      originData.push(item)
      backupOri.push(item)
      selectData.splice(index, 1)
      this.originData = [...originData]
      this.selectData = [...selectData]
      this.backupOri = [...backupOri]
      this.$emit('changeSelect', {
        originData,
        selectData
      })
    }
  }
}
</script>

<style lang="scss">
  .transferBox {
    display: flex;
    justify-content: space-between;

    > li {
      height: 100%;

      > h4 {
        padding: 12px 0;
        font-size: 14px;
        color: #888;
      }

      .transferContent {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 16px 24px;
        overflow: hidden;

        .transferSearch {
          margin-bottom: 8px;
          position: relative;
          display: flex;

          .searchIcon {
            position: absolute;
            font-size: 20px;
            z-index: 2;
            left: 5px;
            top: 10px;
          }

          > .s-input {
            flex: 1;
            display: inline-block;
            box-sizing: border-box;

            > .s-input-inner {
              box-sizing: border-box;
              padding-left: 25px;
            }
          }
        }

        > ul {
          height: 100%;
          overflow-y: auto;

          &::-webkit-scrollbar {
            display: none;
          }

          > li {
            display: flex;
            align-items: center;
            height: 48px;
            overflow: hidden;
          }

          &.origin {
            padding-bottom: 20px;

            > li {
              overflow: hidden;
              cursor: pointer;
            }
          }

          &.select {
            > li {
              justify-content: space-between;

              > p {
                display: flex;
                align-items: center;
              }

              > span {
                cursor: pointer;
                width: 30px;
                text-align: center;
              }
            }
          }

          .symbol {
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background-color: #6884f3;
            color: #fff;
            margin-right: 8px;
          }
        }
      }
    }

    > .transferList {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    > .transferIcon {
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
