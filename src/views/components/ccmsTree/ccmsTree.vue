<template>
  <el-tree
    :data="data"
    :emptyText="emptyText"
    :nodeKey="nodeKey"
    :checkStrictly="checkStrictly"
    :defaultExpandAll="defaultExpandAll"
    :expandOnClickNode="expandOnClickNode"
    :autoExpandParent="autoExpandParent"
    :defaultCheckedKeys="defaultCheckedKeys"
    :defaultExpandedKeys="defaultExpandedKeys"
    :renderContent="renderContent"
    :showCheckbox="showCheckbox"
    :props="props"
    :lazy="lazy"
    :highlightCurrent="highlightCurrent"
    :currentNodeKey="currentNodeKey"
    :load="load"
    :filterNodeMethod="filterNodeMethod"
    :accordion="accordion"
    :indent="indent"
    @node-click="nodeClick"
    @check-change="checkChange"
    @current-change="currentChange"
    @node-expand="nodeExpand"
    @node-collapse="nodeCollapse"></el-tree>
</template>
<script>
  export default{
    name: 'CcmsTree',
    props: {
      data: {
        type: Array
      },
      emptyText: {
        type: String,
        default () {
          return this.$t('el.tree.emptyText')
        }
      },
      nodeKey: String,
      checkStrictly: Boolean,
      defaultExpandAll: Boolean,
      expandOnClickNode: {
        type: Boolean,
        default: true
      },
      autoExpandParent: {
        type: Boolean,
        default: true
      },
      defaultCheckedKeys: Array,
      defaultExpandedKeys: Array,
      renderContent: Function,
      showCheckbox: {
        type: Boolean,
        default: false
      },
      props: {
        default () {
          return {
            children: 'children',
            label: 'label',
            icon: 'icon',
            disabled: 'disabled'
          }
        }
      },
      lazy: {
        type: Boolean,
        default: false
      },
      highlightCurrent: Boolean,
      currentNodeKey: [String, Number],
      load: Function,
      filterNodeMethod: Function,
      accordion: Boolean,
      indent: {
        type: Number,
        default: 16
      }
    },
    data () {
      return {
      }
    },
    methods: {
      nodeClick (data, node, component) {
        this.$emit('node-click', data, node, component)
      },
      checkChange (data, isCheck, checkChild) {
        this.$emit('check-change', data, isCheck, checkChild)
      },
      currentChange (data, node) {
        this.$emit('current-change', data, node)
      },
      nodeExpand (data, node, component) {
        this.$emit('node-expand', data, node, component)
      },
      nodeCollapse (data, node, component) {
        this.$emit('node-collapse', data, node, component)
      }
    }
  }
</script>
