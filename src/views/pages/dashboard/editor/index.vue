<template>
  <div class="dashboard-editor-container clearfix">
    <div class="clearfix">
      首页
        <!--<index-top></index-top>-->
    </div>
    <div style="margin-top: 20px;" class="clearfix">
        <!--<index-center></index-center>-->
    </div>

    <div style="width: 99%;margin-top: 20px;">
        <!--<index-self-module></index-self-module>-->
    </div>
    <div style="width: 99%; margin-top: 20px;">
        <!--<index-link-module></index-link-module>-->
    </div>
  </div>
</template>

<style scoped>
  /*.item[data-v-8368650c] {
    padding: 18px 0;
    font-size: 14px;
  }*/

  .clearfix:before, .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }

  .item ul li {
    padding: 10px;
  }
  .box-card {
    /*width: 360px;*/
  }

  .el-card__header {
    background: #d3dce6;
  }

  .sub-product-img {
    text-align: center;
  }

  .sub-product-text {
    border-top: 1px solid lightgray;
    line-height: 36px;
    height: 36px;
    text-align: center;
  }
</style>
<script>

  export default {
    name: 'editorIndex',
    data () {
      return {}
    }
  }
</script>
