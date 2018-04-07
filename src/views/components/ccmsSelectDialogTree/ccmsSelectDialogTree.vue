/**
* Created by sch on 2017/6/20.
点击输入框旁边的选择按钮弹出一棵树 ----shecaihua
*/
<template>
  <div class="ccms-dialog-tree">
    <!--<el-button class="select-btn" @click="btnOrgSelect">选择</el-button>-->
    <div class="select-input">
      <cc-input  :readonly="true" :disabled="disabled" v-model="currentValue" :placeholder=placeholder>
      </cc-input> <!--ion-grid-->
      <i @click="clickIcon" class="custom-icon ion" :class="[disabled?'el-icon-menu':currentValue===''?'el-icon-menu':showCloseIcon?'el-icon-close':'el-icon-menu']"></i>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      size="small">
      <ccms-tree v-bind="$attrs" :expand-on-click-node="false" ref="ccms-tree" @node-click="nodeClick"  v-on="$listeners"></ccms-tree>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="clickDialogConfrim">{{$t('common.comfrim')}}</el-button>
          <el-button @click="clickDialogCancel">{{$t('common.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import CcmsTree from '../ccmsTree/ccmsTree.vue'
  const oldValue = {
    label: '',
    id: ''
  }
  export default {
    name: 'CcmsSelectDialogTree',
    components: {CcmsTree},
    props: {
      value: {
        required: true
      },
      defaultNode: {
        type: Object,
        default () {
          return {
            id: '',
            label: '',
            nodeId: '',
            nodeName: ''
          }
        }
      },
      title: [String],
      treeStyle: [Object],
      showCloseIcon: [Boolean],
      disabled: [Boolean],
      placeholder: [String]
    },
    inheritAttrs: false,
    data () {
      return {
        dialogVisible: false,
        currentValue: '',
        showDialogVisible: false,
        currentNode: {
          label: '',
          id: ''
        }
      }
    },
    watch: {
      value (val) {
        // 实现外面点x更新显示的字段
        // 此方案为零时解决方案 当父组件为空时 显示的字段名称也就清空
        // 比较好的做法是 搜索整个树 找到id对应的做法
        if (val) return
        this.currentValue = val
        oldValue.label = ''
        oldValue.id = ''
      },
      defaultNode: {
        handler (val) {
          oldValue.label = val.label || val.nodeName
          oldValue.id = val.id || val.nodeId
          this.handleNode({label: val.label || val.nodeName, id: val.id || val.nodeId})
        },
        deep: true
      }
    },
    methods: {
      clickIcon () {
        // 不能编辑的时候 点击没有任何作用
        if (this.disabled) {
          return
        }
        // 当前没有值 则弹出选择的树 有值但不现实x
        if (this.currentValue === '' || this.currentValue && !this.showCloseIcon) {
          this.dialogVisible = true
          this.$emit('clickIcon')
          return
        }
        // 有值 并且在有值的时候需要显示X 点击的时候就清除内容
        if (this.currentValue && this.showCloseIcon) {
          this.currentValue = ''
          this.$emit('input', '')
          this.$emit('iconClose')
          return
        }
      },
      nodeClick (data, node, self) {
        this.handleNode({label: data[this.$attrs.props.label], id: data.id})
        this.currentNode.data = data
        this.currentNode.node = node
        this.currentNode.self = self
      },
      close () {
        this.currentValue = ''
        this.$emit('input', '')
        this.$emit('close')
      },
      handleNode ({label = '', id = ''} = {}) {
        this.currentValue = label
        this.$emit('input', id)
        this.currentNode.label = label
        this.currentNode.id = id
      },
      // 关闭对话框
      closeDialog () {
        this.$emit('closeDialog')
        this.handleNode({label: oldValue.label, id: oldValue.id})
      },
      clickDialogConfrim () {
        this.$emit('clickDialogConfrim', this.currentNode)
        this.dialogVisible = false
        oldValue.label = this.currentNode.label
        oldValue.id = this.currentNode.id
      },
      clickDialogCancel () {
        this.$emit('clickDialogCancel')
        this.dialogVisible = false
        this.handleNode({label: oldValue.label, id: oldValue.id})
      }
    }
  }
</script>
