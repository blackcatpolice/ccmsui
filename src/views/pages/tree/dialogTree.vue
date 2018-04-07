<template>
  <div>
    <div>基本弹出树  【参数对标饿了么组件】</div>
    <div style="position: relative; width: 60%">
      <ccms-select-dialog-tree
        :data="regions"
        :props="props"
        title="弹出一棵树"
        :load="loadNode"
        :expand-on-click-node="false"
        lazy
        @check-change="handleCheckChange"></ccms-select-dialog-tree>
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
  export default {
    data () {
      return {
        defaultNode: {
          nodeId: '',
          nodeName: ''
        },
        code: `
 <ccms-select-dialog-tree
        :data="regions"
        :props="props"
        title="弹出一棵树"
        :load="loadNode"
        :expand-on-click-node="false"
        lazy
        @check-change="handleCheckChange"></ccms-select-dialog-tree>`,
        script: `
  export default {
    data () {
      return {
        defaultNode: {
          nodeId: '',
          nodeName: ''
        },
        id: 1,
        regions: [{
          'name': 'region1',
          'id': this.id++
        }, {
          'name': 'region2',
          'id': this.id++
        }],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1
      }
    },
    mounted () {
      setTimeout(() => {
        this.defaultNode.nodeId = 2
        this.defaultNode.nodeName = 'region1'
      }, 20)
    },
    methods: {
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },
      handleNodeClick (data) {
        console.log(data)
      },
      loadNode (node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1', 'id': this.id++ }, { name: 'region2', 'id': this.id++ }])
        }
        if (node.level > 3) return resolve([])

        var hasChild
        if (node.data.name === 'region1') {
          hasChild = true
        } else if (node.data.name === 'region2') {
          hasChild = false
        } else {
          hasChild = Math.random() > 0.5
        }

        setTimeout(() => {
          var data
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++,
              'id': this.id++
            }, {
              name: 'zone' + this.count++,
              'id': this.id++
            }]
          } else {
            data = []
          }

          resolve(data)
        }, 500)
      }
    }
  }
`,
        tableFunData: [{prop: 'closeDialog', desc: 'event对象 点击关闭对话框的按钮', type: 'Function'},
          {prop: 'clickIcon', desc: 'event对象 点击输入框的图标', type: 'Function'},
          {prop: 'iconClose', desc: 'event对象 点击了输入框的【X】按钮 showCloseIcon为true时 输入框有值的时候显示', type: 'Function'},
          {prop: 'clickDialogConfrim', desc: 'event对象 点击了输入框的确定按钮', type: 'Function'},
          {prop: 'clickDialogCancel', desc: 'event对象 点击了输入框的取消按钮', type: 'Function'}],
        columnPropArr: [
          {prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}
        ],
        id: 1,
        tableData: [{prop: 'defaultNode.nodeId', desc: '节点id', type: 'String/Number'},
          {prop: 'defaultNode.nodeName', desc: '节点名称', type: 'String/Number'},
          {prop: 'disabled', desc: '是否可编辑', type: 'Boolean', default: 'false'},
          {prop: 'showCloseIcon', desc: '是否展示清除图标', type: 'Boolean', default: 'false'},
          {prop: 'placeholder', desc: '默认显示提示信息', type: 'String', default: '-'},
          {prop: 'title', desc: '弹出框标题', type: 'String', default: '-'}],
        regions: [{
          'name': 'region1',
          'id': this.id++
        }, {
          'name': 'region2',
          'id': this.id++
        }],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1
      }
    },
    mounted () {
      setTimeout(() => {
        this.defaultNode.nodeId = 2
        this.defaultNode.nodeName = 'region1'
      }, 20)
    },
    methods: {
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },
      handleNodeClick (data) {
        console.log(data)
      },
      loadNode (node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1', 'id': this.id++ }, { name: 'region2', 'id': this.id++ }])
        }
        if (node.level > 3) return resolve([])

        var hasChild
        if (node.data.name === 'region1') {
          hasChild = true
        } else if (node.data.name === 'region2') {
          hasChild = false
        } else {
          hasChild = Math.random() > 0.5
        }

        setTimeout(() => {
          var data
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++,
              'id': this.id++
            }, {
              name: 'zone' + this.count++,
              'id': this.id++
            }]
          } else {
            data = []
          }

          resolve(data)
        }, 500)
      }
    }
  }
</script>
