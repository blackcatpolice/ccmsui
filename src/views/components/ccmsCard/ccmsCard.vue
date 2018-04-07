<template>
  <div>
    <el-card class="ccms-card">
      <div slot="header">
        <div style="float: left"><slot name="header"></slot></div>
        <span class="back" v-if="isShowReturn" @click="goBack"><< {{t('ccmsCard.return')}}</span>
      </div>
      <slot></slot>
      <div class="btn-group">
        <slot name="btn-group">
        </slot>
      </div>
    </el-card>
  </div>
</template>
<script>
  import Locale from '../mixins/locale'
  export default {
    name: 'CcmsCard',
    mixins: [Locale],
    props: {
      isShowReturn: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      tarUrl: [String]
    },
    methods: {
      goBack () {
        if (this.tarUrl) {
          this.$router.push(this.tarUrl)
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>
<style>
  .el-collapse-item__header{
    text-align: center;
  }
</style>
