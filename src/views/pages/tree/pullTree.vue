<template>
  <div>
    <div>基本下拉树  【参数对标饿了么组件】</div>
    <div style="position: relative; width: 60%">
      <ccms-pull-tree
        :data="regions"
        :props="props"
        :load="loadNode"
        :expand-on-click-node="false"
        lazy
        @check-change="handleCheckChange"></ccms-pull-tree>
    </div>
    <div>有默认节点</div>
    <div style="position: relative; width: 60%">
    <ccms-pull-tree
      :data="regions"
      :defaultNode="defaultNode"
      :props="props"
      :load="loadNode"
      :expand-on-click-node="false"
      lazy
      @check-change="handleCheckChange"
    ></ccms-pull-tree>
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
  <ccms-pull-tree
      :data="regions"
      :defaultNode="defaultNode"
      :props="props"
      :load="loadNode"
      :expand-on-click-node="false"
      lazy
      @check-change="handleCheckChange"
    ></ccms-pull-tree>`,
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
                    {prop: 'showClose', desc: '是否展示清除图标', type: 'Boolean', default: 'false'},
                    {prop: 'placeholder', desc: '默认显示提示信息', type: 'String', default: '-'}],
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
