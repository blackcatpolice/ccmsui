<template>
  <div class="ccms-dialog">
  <el-dialog
    :title="title"
    :size="size"
    v-bind="$attrs"
    v-on="$listeners"
    :before-close="beforeClose"
    >
    <slot></slot>
    <span slot="footer" v-if="showBtn">
      <el-button @click="conFrim" type="primary">{{t('ccmsDialog.confirm')}}</el-button>
      <el-button @click="cancel">{{t('ccmsDialog.cancel')}}</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
  import ElDialog from '../../../../node_modules/element-ui/lib/dialog'
  import Locale from '../mixins/locale'
  export default{
    name: 'CcmsDialog',
    mixins: [Locale],
    components: {ElDialog},
    props: {
      title: {
        type: [String],
        default: function () {
          return this.t('ccmsDialog.prompt')
        }
      },
//      visible: {
//        type: [Boolean],
//        default: false
//      },
      size: {
        type: [String],
        default: 'tiny'
      },
      showBtn: {
        type: [Boolean],
        default: true
      }
    },
    inheritAttrs: false,
    methods: {
      conFrim () {
        this.$emit('conFrim')
      },
      cancel () {
        this.$emit('cancel')
      },
      beforeClose (done) {
        this.$emit('bf-close')
        done()
      }
    }
  }
</script>

