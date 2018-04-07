<template>
  <!--<el-breadcrumb class="app-levelbar" separator="/">-->
    <!--<el-breadcrumb-item v-for="(item, index)  in levelList" :key="item.value">-->
      <!--<router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{$t(item.name)}}</router-link>-->
      <!--<router-link v-else :to="item.path">{{$t(item.name)}}</router-link>-->
    <!--</el-breadcrumb-item>-->
  <!--</el-breadcrumb>-->
</template>

<!--<script>-->
  <!--export default {-->
    <!--created () {-->
      <!--this.getBreadcrumb()-->
    <!--},-->
    <!--data () {-->
      <!--return {-->
        <!--levelList: null-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--getBreadcrumb () {-->
        <!--let matched = this.$route.matched.filter(item => item.name)-->
        <!--const first = matched[0]-->
        <!--if (first && (first.name !== 'router.index' || first.path !== '')) {-->
          <!--matched = [{name: 'router.index', path: '/'}].concat(matched)-->
        <!--}-->
        <!--this.levelList = matched-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--$route () {-->
        <!--this.getBreadcrumb()-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style rel="stylesheet/css" scoped>-->
  <!--.app-levelbar.el-breadcrumb {-->
    <!--display: inline-block;-->
    <!--font-size: 16px;-->
    <!--line-height: 65px;-->
    <!--margin-left: 10px;-->
  <!--}-->
  <!--.app-levelbar.el-breadcrumb a {-->
    <!--color:#fff;-->
  <!--}-->
  <!--.no-redirect {-->
    <!--color: #fff;-->
    <!--cursor: text;-->
  <!--}-->
  <!--.el-breadcrumb__item:last-child .el-breadcrumb__item__inner, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover {-->
    <!--color: #fff;-->
  <!--}-->
<!--</style>-->
