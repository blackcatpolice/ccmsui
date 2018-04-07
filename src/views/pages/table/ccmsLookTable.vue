<template>
  <div>
    <div>基本的查看功能 标准模式</div>
    <ccms-look-table :column="column" :pattern="pattern" :tableList="tableList1" :msg="msg"></ccms-look-table>
    <div><label>请选择列数: </label><el-select v-model="column">
      <el-option label="1" :value="1"></el-option>
      <el-option label="2" :value="2"></el-option>
      <el-option label="3" :value="3"></el-option>
      <el-option label="4" :value="4"></el-option>
      <el-option label="5" :value="5"></el-option>
    </el-select></div>
    <div>detail 模式</div>
    <ccms-look-table :column="column2" :pattern="pattern2" :tableList="tableList2" :msg="msg"></ccms-look-table>
    <div><label>请选择列数: </label><el-select v-model="column2">
      <el-option label="1" :value="1"></el-option>
      <el-option label="2" :value="2"></el-option>
      <el-option label="3" :value="3"></el-option>
      <el-option label="4" :value="4"></el-option>
      <el-option label="5" :value="5"></el-option>
    </el-select></div>
    <div>form 模式</div>
    <ccms-look-table :column="column3" :pattern="pattern3" :tableList="tableList3"></ccms-look-table>
    <div><label>请选择列数: </label><el-select v-model="column3">
      <el-option label="1" :value="1"></el-option>
      <el-option label="2" :value="2"></el-option>
      <el-option label="3" :value="3"></el-option>
      <el-option label="4" :value="4"></el-option>
      <el-option label="5" :value="5"></el-option>
    </el-select></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        column3: 3,
        pattern3: 'form',
        tableList3: [{label: '客户号', content: 'test1'}, {label: '二级分行', content: 'test2'},
          {label: '注册地址', content: 'test3'}, {label: '客户名称 ', content: 'test4'},
          {label: '是否完成表内处置', subLabel: '(表内处置未完成或表内处置已完成)', content: 'test1'}, {label: '组织代码', content: 'test2'},
          {label: '主客户经理 ', content: 'test3'}, {label: '企业性质(民营或国有或外资)', content: 'test4'},
          {label: '首笔发放时间', content: 'test1'}, {label: '客户经理联系电话', content: 'test2'},
          {label: '行业类型', content: 'test3'}, {label: '首笔逾期时间', content: 'test4'},
          {label: '一级分行', content: 'test1'}, {label: '法定代表人', content: 'test2'},
          {label: '进入不良时间', content: 'test3'}],
        column2: 2,
        pattern2: 'detail',
        tableList2: [{label: 'test1 l', content: 'test1 c'}, {label: 'test2 l', content: 'test2 c'},
          {label: 'test3 l', content: 'test3 c'}, {label: 'test4 l', content: 'test4 c'}, {label: 'test5 l', content: 'test5 c'}, {label: 'test6 l', content: 'test6 c'}],
        column: 2,
        pattern: 'standard',  // detail form,
        tableList1: [{content: '<span style="color: red">test</span>', style: 'font-size: 18px'},
          {content: '这是第一列'}, {content: '这是第二列'}, {content: '这是第三列'}, {content: '这是第四列'}],
        msg: '当前没有数据'
      }
    }
  }
</script>
