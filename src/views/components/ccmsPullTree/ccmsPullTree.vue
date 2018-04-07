/**
 * Created by sch on 2017/6/20.
 *下拉树控件    -----shecaihua
 */
<template>
  <div class="ccms-drop-down-tree">
    <el-dropdown class="dropdown-custom" trigger="click" @visible-change="clickDropDown">
      <cc-input :readonly="true" v-model="currentValue" :placeholder="placeholder" :disabled="disabled"></cc-input>
      <i @click="close" ref="ccms-icon" class="custom-icon el-icon-caret-top"></i>
      <el-dropdown-menu slot="dropdown" v-if="!disabled" class="dropdown-menu-custom" id="dropdown-menu-custom-id">
        <el-dropdown-item ref="ccms-dropdown-item" v-show="false" class="dropdown-item-custom"></el-dropdown-item>
        <ccms-tree v-bind="$attrs" ref="ccms-tree" @node-click="nodeClick"  v-on="$listeners"></ccms-tree>
        <!--v-on="$listeners"-->
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  const oldValue = {
    label: '',
    id: ''
  }
  import CcmsTree from '../ccmsTree/ccmsTree.vue'
  export default {
    name: 'CcmsPullTree',
    components: {CcmsTree},
    props: {
      defaultNode: {
        type: Object,
        default: function () {
          return {
            nodeName: '',
            nodeId: ''
          }
        }
      },
      disabled: [Boolean],
      showClose: [Boolean],
      placeholder: [String],
      value: [String, Number]
    },
    inheritAttrs: false,
    data () {
      return {
        currentValue: '',
        currentNode: {
          label: '',
          id: ''
        }
      }
    },
    watch: {
      value (val, oldVal) {
        // 实现外面点x更新显示的字段
        // 此方案为零时解决方案 当父组件为空时 显示的字段名称也就清空
        // 比较好的做法是 搜索整个树 找到id对应的做法
        // 只做清除操作
        let el = this.$refs['ccms-icon']
        if (val) {
          el.className = el.className + ' el-icon-close'
          return
        }
        el.className = el.className.replace(/el-icon-close/g, '')
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
    mounted () {
//      this.$refs['ccms-tree'].nodeClick = this.nodeClick
    },
    methods: {
      clickDropDown (val) {
        if (this.disabled) return
        let el = this.$refs['ccms-icon']
        if (val) {
          el.className = el.className + ' is-reverse'
        } else {
          el.className = el.className.replace('is-reverse', '')
        }
        let dropdown = this.$el.getElementsByClassName('dropdown-custom')
        let dropdownmenucustom = this.$el.getElementsByClassName('dropdown-menu-custom')
        if (dropdownmenucustom.length) {
          dropdownmenucustom[0].style.width = dropdown[0].clientWidth + 'px'
          dropdownmenucustom[0].style.top = dropdown[0].clientTop + 'px'
        }
      },
      nodeClick (data, node, self) {
        this.$emit('input', data.id)
        this.currentValue = data.name
//        this.$emit('node-click', data, node, self)
        this.$refs['ccms-dropdown-item'].$el.click()
      },
      handleNode ({label = '', id = ''} = {}) {
        this.currentValue = label
        this.$emit('input', id)
        this.currentNode.label = label
        this.currentNode.id = id
      },
      close () {
        let el = this.$refs['ccms-icon']
        el.className = el.className.replace(/el-icon-close/g, '')
        this.$emit('input', '')
      }
    }
  }
</script>
