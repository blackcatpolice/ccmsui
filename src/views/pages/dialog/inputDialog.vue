<template>
  <div>
    <div>输入框弹出一个对话框</div>
    <div style="width: 80%;position: relative">
    <ccms-input-dialog v-model="model">
      <ccms-table :dataArr="dataArr"  @row-click="rowClick" highlight-current-row :columnPropArr="dialogColumnPropArr"></ccms-table>
    </ccms-input-dialog>

      <el-collapse>
        <el-collapse-item title="显示代码">
    <pre>
      <code>
        {{code}}
        {{script}}
      </code>
    </pre>
        </el-collapse-item>
      </el-collapse>
      <ccms-table :dataArr="tableData" :columnPropArr="tableColumnPropArr"></ccms-table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        model: '',
        dialogColumnPropArr: [{prop: 'date', label: '日期'}, {prop: 'name', label: '名字'}, {prop: 'address', label: '地址'}],
        dataArr: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        code: `<ccms-input-dialog v-model="model"></ccms-input-dialog>`,
        script: `  export default {
    data () {
      return {
        model: '',
        dialogColumnPropArr: [{prop: 'date', label: '日期'}, {prop: 'name', label: '名字'}, {prop: 'address', label: '地址'}],
        dataArr: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tableColumnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        tableData: [{prop: 'title', desc: '弹出对话框的标题', type: 'String', hasSelect: '', default: ''},
          {prop: 'showCloseIcon', desc: '输入框右边的图标【当有内容时 图标会变成x】', type: 'Boolean', hasSelect: 'true/false', default: ''}]
      }
    },
    methods: {
      rowClick (row) {
        this.model = row.date
      }
    }
  }`,
        tableColumnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        tableData: [{prop: 'title', desc: '弹出对话框的标题', type: 'String', hasSelect: '', default: ''},
          {prop: 'showCloseIcon', desc: '输入框右边的图标【当有内容时 图标会变成x】', type: 'Boolean', hasSelect: 'true/false', default: ''}]
      }
    },
    methods: {
      rowClick (row) {
        this.model = row.date
      }
    }
  }
</script>
<style>
  .el-collapse-item__header{
    text-align: center;
  }
</style>
