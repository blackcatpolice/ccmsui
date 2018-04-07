<template>
  <div>
    <el-form-item :label="itemObj.label" v-show="typeof itemObj.showFlag==='undefined'?true:itemObj.showFlag" :prop="itemObj.prop" :rules="itemObj.disabledFlag? []:itemObj.rules">
      <slot></slot>
    </el-form-item>
  </div>
</template>
<style></style>
<script>
  export default{
    name: 'CcmsFormItem',
    data () {
      return {
      }
    },
    props: {
      itemObj: [Object]
    }
  }
</script>
