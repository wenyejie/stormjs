<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/14
 -->
<template>
  <s-layout>
    <h1>典型的CRUD</h1>

    <!-- 当getting === 1时s-panel组件处于loading状态-->
    <s-panel
      :class="{loading: getting === 1}"
      padding>
      <template slot="header">
        <s-row justify="between">
          <s-col>
            <s-form>
              <s-form-item>

                <!-- v-model.trim, trim 用于移除输入文本的前后空格, 详见: https://cn.vuejs.org/v2/guide/forms.html#trim -->
                <s-input
                  placeholder="用户名/姓名"
                  title="用户名/姓名"
                  v-model.trim="form.title" />
              </s-form-item>
              <s-form-item>

                <!--
                  - disabled: 当处于请求状态时, 禁止点击, 避免重复提交
                  - loading: 表示按钮处于加载状态, 会显示loading效果
                 -->
                <s-button
                  :loading="getting === 1"
                  @click="getList()"
                  type="info">
                  提交
                </s-button>
              </s-form-item>
            </s-form>
          </s-col>
          <s-col>
            <s-button
              type="info"
              @click="handleAdd()"
              icon="tianjiax">新建用户
            </s-button>
          </s-col>
        </s-row>
      </template>

      <s-table
        size="lg"
        stripe>
        <tr slot="head">
          <th>用户名</th>
          <th>验证方式</th>
          <th>密码</th>
          <th>说明</th>
          <th>操作</th>
        </tr>

        <tr
          v-for="(item, index) in list"
          :key="item.id">
          <td>{{ item.accountName }}</td>
          <td>{{ item.authType | authType }}</td>
          <td>{{ item.accountPassword }}</td>
          <td>{{ item.remark }}</td>
          <td class="s-table-btn">
            <a
              href="javascript:;"
              @click="handleEdit(item, index)">编辑</a> |
            <a
              href="javascript:;"
              @click="handleDel(item, index)">删除</a>
          </td>
        </tr>
      </s-table>
      <s-page
        v-if="totalSize >= 0"
        @change="getList(currentPage)"
        :page-size="pageSize"
        :total-size="totalSize"
        v-model="currentPage" />
    </s-panel>

    <!-- 新建/编辑用户 -->
    <!-- edit.form.id 只有编辑才有ID, 所以可以用这个来判断是新建还是编辑 -->
    <s-dialog
      :title="`${edit.form.hasOwnProperty('id') ? '新建' : '编辑'}用户`"
      ok-text="提交"
      size="md"
      @ok="handleOk"
      v-model="edit.dialog">
      <s-form
        ref="editForm"
        block
        has-label>
        <s-form-item>
          <s-input
            v-model.trim="edit.form.accountName"
            title="账号名称"
            block
            required
            name="accountName" />
        </s-form-item>
        <s-form-item>
          <s-radio-group
            v-model.trim="edit.form.authType"
            title="验证方式"
            block
            required
            name="authType">
            <s-radio :value="1">密码</s-radio>
            <s-radio
              :value="2"
              style="margin-left: 200px;">ssh-key
            </s-radio>
          </s-radio-group>
        </s-form-item>
        <s-form-item :label="false">
          <s-textarea
            v-model.trim="edit.form.accountPassword"
            :title="edit.form.authType === 1 ? '密码' : 'ssh-key'"
            required
            block
            rows="4"
            name="accountPassword" />
        </s-form-item>
        <s-form-item>
          <s-textarea
            v-model.trim="edit.form.remark"
            title="说明"
            block
            rows="4"
            name="remark" />
        </s-form-item>
      </s-form>
    </s-dialog>
    <!-- 新建/编辑用户 -->

  </s-layout>
</template>

<script>
import crud from '../../apis/crud'

// 默认新建用户的表单配置
const defAddForm = {
  authType: 1,
  accountName: '',
  accountPassword: '',
  remark: ''
}

export default {
  name: 'VCrud',
  filters: {
    authType (input) {
      switch (input) {
        case 1:
          return '密码'
        case 2:
          return 'ssh-key'

        // default是必须的
        default:
          return ''
      }
    }
  },
  data () {
    return {

      // 获取状态, 0: 未请求, 1: 请求中, 2: 请求成功, 3: 请求失败
      getting: 0,

      // 查询表单
      form: {
        title: ''
      },

      // 当前页码
      currentPage: 0,

      // 总条数
      totalSize: 0,

      // 每页条数
      pageSize: 0,

      // 数据列表
      list: [],

      // 编辑/新增参数汇总
      edit: {

        // 弹出框状态
        dialog: false,

        // 表单, 解构
        form: { ...defAddForm },

        // 请求状态
        posting: 0,

        // 编辑的数据下标
        index: 0
      }
    }
  },
  created () {
    // 获取数据列表
    this.getList()
  },
  methods: {

    // 编辑用户信息
    handleEdit (item, index) {

      // 解构是因为浅拷贝, 避免修改数据的时候, 直接影响到列表中的数据, 如果是多层数据那需要深拷贝
      this.edit.form = { ...item }

      // 记住数据下标, 当编辑成功时, 直接修改列表中的数据, 避免重新拉取列表
      this.edit.index = index

      // 打开弹出框
      this.edit.dialog = true
    },

    // 弹出框, 点击OK按钮
    handleOk () {

      // 验证表单是否正确
      this.$refs.editForm.validate(({ $invalid }) => {
        if ($invalid || this.edit.posting === 1) return

        this.edit.posting = 1

        // 修改
        if (this.edit.form.hasOwnProperty('id')) {

          this.postUpdate()

          // 新增
        } else {
          this.postAdd()
        }
      })
    },

    // 提交编辑用户请求
    postUpdate () {
      crud.update(this.edit.form.id, this.edit.form)
        .then(() => {
          this.edit.posting = 2

          // 赋值回原列表数据
          this.list[this.edit.index] = this.edit.form

          // 提示用户修改成功!
          this.$message.success(`${this.edit.form.accountName}修改成功!`)

          // 隐藏弹出框
          this.edit.dialog = false
        }, () => {
          this.edit.posting = 3
        })
    },

    // 提交新建用户请求
    postAdd () {
      crud.add(this.edit.form)
        .then(res => {
          this.edit.posting = 2

          // 如果会返回所有数据则直接unshift/push到列表中, 否则需要重新拉取列表数据, 这里返回了所有数据, 所以直接push列表中
          this.list.push(res)

          // 提示用户添加成功!
          this.$message.success(`${this.edit.form.accountName}添加成功!`)

          // 隐藏弹出框
          this.edit.dialog = false
        }, () => {
          this.edit.posting = 3
        })
    },

    // 新建用户
    handleAdd () {

      // 解构是因为浅拷贝, 避免直接影响到原始数据
      this.edit.form = { ...defAddForm }

      // 打开弹出框
      this.edit.dialog = true
    },

    // 删除
    handleDel (item, index) {
      // deleting 删除状态, 避免重复提交
      if (item.deleting === 1) return

      this.$dialog.confirm(`是否要删除${item.accountName}`, { title: '提示' })
        .then(() => {
          item.deleting = 1
          crud.del(item.id)
            .then(() => {

              // 变更删除状态
              item.deleting = 2

              // 提示删除成功!
              this.$message.success(`${item.accountName}删除成功`)

              // 从list中移除被删除的数据, 而不是重新拉取列表数据
              this.list.splice(index, 1)

            }, () => {

              // 变更删除状态
              item.deleting = 3
            })
        }, _ => _)
    },

    // 获取数据列表, 设置默认值
    getList (pageNo = 0, rows = 10) {

      // 正在请求数据, 退出请求, 避免重复请求
      if (this.getting === 1) return

      // 设置请求状态, 避免重复请求, 用于请求状态控制
      this.getting = 1

      // 因为分页组件是以0为开始
      pageNo++

      // 请求数据列表
      crud.list({ pageNo, rows, ...this.form })
        .then(({ dataList = [], currentPage, totalSize, pageSize }) => {
          // 变更请求状态, 表示请求成功! 必须放在第一位, 避免后续程序错误, 导致一直处于加载状态
          this.getting = 2

          // 需要做非空判断(专业术语叫: 容错处理, 即 => dataList = []), 避免后端没有数据时, 页面出错
          // 有些数据没有分页需要自己分页, 详见其它案例
          this.list = dataList

          // 当前页, 减一, 因为page组件是以0开始
          this.currentPage = currentPage - 1

          // 总条数
          this.totalSize = totalSize

          // 每页条数, 可以没有, page(分页)组件有默认值: 10
          this.pageSize = pageSize
        }, () => {
          // 当请求失败时, 状态为3, 无需提示, http.js中已内置错误提示.
          // 当然可以禁用内置提示, 自定义相关提示
          this.getting = 3
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
