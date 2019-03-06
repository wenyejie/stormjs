<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <s-layout>
    <!--<s-upload>上传</s-upload>-->
    <template slot="left">
      测试
    </template>
    <s-transfer
      class="box"
      :origin-value="userList"
      :select-value="[]"
      filter-key="name"
      @changeSelect="getSelectData"/>
  </s-layout>
</template>

<script>
export default {
  name: 'VDemo',
  data () {
    return {
      userList: []
    }
  },
  watch: {
    demo: {
      handler () {

      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.init()
  },
  mounted () {
    setTimeout(() => {
      let userList = []
      let familyName = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '张']
      let secondName = ['依霜', '紫薇', '瑜然', '新霁', '迎天', '哲彦', '宏邈', '念文', '辰君', '令璟']
      let job = ['前端开发', 'JAVA开发', '数据库开发', 'UI']
      for (let i = 0; i < 20; i++) {
        userList.push({
          id: i,
          name: familyName[Math.ceil(Math.random() * 8)] + secondName[Math.ceil(Math.random() * 9)],
          job: job[Math.ceil(Math.random() * 3)]
        })
      }
      this.userList = [...userList]
      console.log(userList)
    }, 500)
  },
  methods: {
    init () {
    },
    getSelectData (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    display: grid;
    width: 320px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    background-color: #fff;
  }

  .item {
    background-color: rgba(200, 194, 0, .75);
    color: #fff;
    text-align: center;
    line-height: 100px;
  }
  .box {
    width: 600px;
    height: 300px;
    // background-color: #ccc;
  }
</style>
