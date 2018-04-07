<template>
  <div class="ccms-input-dialog">
  <div class="select-input">
    <cc-input  :readonly="true" :disabled="disabled" v-model="currentValue" :placeholder=placeholder>
    </cc-input> <!--ion-grid-->
    <i @click="clickIcon" class="custom-icon ion" :class="[disabled?'el-icon-menu':currentValue===''?'el-icon-menu':showCloseIcon?'el-icon-close':'el-icon-menu']"></i>
  </div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @close="close"
      size="small">
      <slot></slot>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="clickConfrim">{{t('ccmsDialog.confirm')}}</el-button>
          <el-button @click="clickCancel">{{t('ccmsDialog.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Locale from '../mixins/locale'
  export default{
    name: 'CcmsInputDialog',
    mixins: [Locale],
    props: {
      value: {
        required: true
      },
      title: [String],
      disabled: [Boolean],
      placeholder: [String],
      showCloseIcon: [Boolean]
    },
    watch: {
      value (val) {
        // 实现外面点x更新显示的字段
        // 此方案为零时解决方案 当父组件为空时 显示的字段名称也就清空
        // 比较好的做法是 搜索整个树 找到id对应的做法
//        if (val) return
        this.currentValue = val
      }
    },
    data () {
      return {
        visible: false,
        currentValue: '',
        // 上一次点了确定后的值
        lastComFrimVal: ''
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
          this.visible = true
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
      close () {
        this.visible = false
        this.$emit('input', this.lastComFrimVal)
      },
      clickConfrim () {
        this.visible = false
        this.lastComFrimVal = this.currentValue
        this.$emit('clickConfrim')
      },
      clickCancel () {
        this.visible = false
        this.$emit('clickCancel')
        this.$emit('input', this.lastComFrimVal)
      }
    }
  }
</script>
