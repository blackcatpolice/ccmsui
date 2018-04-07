<template>
  <div>
    <div>基本的卡片布局</div>
    <ccms-card></ccms-card>
    <el-collapse>
      <el-collapse-item title="显示代码">
    <pre>
      <code>
        {{code}}
      </code>
    </pre>
      </el-collapse-item>
    </el-collapse>
    <div>card attribute</div>
    <ccms-table :dataArr="tableData" :columnPropArr="tableColumnPropArr"></ccms-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        code: `<ccms-card></ccms-card>`,
        tableColumnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        tableData: [{prop: 'isShowReturn', desc: '是否显示返回按钮', type: 'Boolean', hasSelect: 'true/false', default: 'false'},
        {prop: 'tarUrl', desc: '点击返回需要跳转的链接', type: 'String', hasSelect: '-', default: '默认返回上一级'},
          {prop: 'header', desc: '设置 header，也可以通过 slot#header 传入 DOM', type: 'String', hasSelect: '-', default: '-'}]
      }
    }
  }
</script>
<style>
  .el-collapse-item__header{
    text-align: center;
  }
</style>
