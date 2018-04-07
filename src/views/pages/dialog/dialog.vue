<template>
  <div>
    <div>基本对话框</div>
    <el-button @click="visible = true">点击弹出对话框</el-button>
    <ccms-dialog :visible.asyn="visible" @conFrim="conFrim" @cancel="cancel" @bf-close="bfClose"></ccms-dialog>
    <el-collapse>
      <el-collapse-item title="显示代码">
    <pre>
      <code>
        {{code}}
      </code>
    </pre>
      </el-collapse-item>
    </el-collapse>
    <div><div>方法(通过ref调用) Events(@evt调用)</div></div>
    <ccms-table :dataArr="tableData" :columnPropArr="tableColumnPropArr"></ccms-table>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        visible: false,
        tableColumnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        tableData: [{prop: 'conFrim', desc: 'event对象 点击了弹出框的确认按钮【如果要隐藏弹出框 需要手动将visible设置为false】'},
          {prop: 'cancel', desc: 'event对象 点击了弹出框的取消按钮【如果要隐藏弹出框 需要手动将visible设置为false】'},
          {prop: 'bfClose', desc: 'event对象 点击了弹出框的关闭x【如果要隐藏弹出框 需要手动将visible设置为false】'}],
        code: ` <ccms-dialog :visible.asyn="visible" @conFrim="conFrim" @cancel="cancel" @bf-close="bfClose"></ccms-dialog>`
      }
    },
    methods: {
      conFrim () {
        this.visible = false
      },
      cancel () {
        this.visible = false
      },
      bfClose () {
        this.visible = false
      }
    }
  }
</script>
<style>
  .el-collapse-item__header{
    text-align: center;
  }
</style>
