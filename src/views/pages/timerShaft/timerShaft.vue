<template>
  <div>
      <div>
        时间轴 不在同一侧
        <ccms-timer-shaft :data="data"></ccms-timer-shaft>
      </div>
      <div style="margin-top: 50px">
        时间轴 在同一侧
        <ccms-timer-shaft :data="data" :sameside="true"></ccms-timer-shaft>
      </div>
      <div style="margin-top: 50px">
        时间轴 可以点击中心的事件点
        <ccms-timer-shaft :data="data" @clickItem="clickItem" :sameside="true" :clickCircle="true"></ccms-timer-shaft>
      </div>
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
    <ccms-table :dataArr="tableData" :columnPropArr="columnPropArr"></ccms-table>
    <div>方法(通过ref调用) Events(@evt调用)</div>
    <ccms-table :dataArr="tableFunData" :columnPropArr="columnPropArr"></ccms-table>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        columnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        tableData: [{prop: 'sameside', desc: '时间和内容是否在同一列', type: 'Boolean', hasSelect: 'true/false', default: 'false'},
          {prop: 'clickCircle', desc: '节点是否可点击', type: 'Boolean', hasSelect: 'true/false', default: 'false'},
          {prop: 'data', desc: '要显示的数据', type: 'Array'}],
        tableFunData: [{prop: 'clickItem', desc: 'event对象 点击节点返回整个节点data对象', type: 'Function'}],
        code: `        <ccms-timer-shaft :data="data" @clickItem="clickItem" :sameside="true" :clickCircle="true"></ccms-timer-shaft>`,
        script: `  export default{
    data () {
      return {
        data: [
            {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'},
          {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}]
      }
    },
    methods: {
      clickItem (item) {
        alert(JSON.stringify(item))
      }
    }
  }`,
        data: [
            {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'},
          {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}, {title: '下调不良时间', time: '2017.02.03'}]
      }
    },
    methods: {
      clickItem (item) {
        alert(JSON.stringify(item))
      }
    }
  }
</script>
