<template>
    <el-menu unique-opened mode="vertical" theme="dark" :default-active="$route.path">
      <div class="custom-sidebar-item">
      <sidebar-item :routes='permission_routers'></sidebar-item>
      </div>
      <!--<a  class="custom-href" target="_blank" href="http://22.188.13.191:8080/clmWeb/system/SSOLoginServlet?func=login"><wscn-icon-svg icon-class="zonghe"/><span class="item-txt">国内</span></a>-->
      <!--<a class="custom-href" target="_blank" href="http://22.188.13.191:8081/ccmsWeb/SSOLoginAction.do?func=login "><wscn-icon-svg icon-class="zonghe"/><span class="item-txt">海外</span></a>-->
    </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'permission_routers'
      ])
    },
    mounted () {
      let vm = this
      window.$('.custom-sidebar-item >div > .el-submenu > .el-submenu__title').bind('click', function (evt) {
        vm.clickItem(this)
      })
    },
    methods: {
      clickItem (evt) {
        let active = window.$(evt).find('.js-title').attr('class').indexOf('active')
        window.$('.js-title').each(function () {
          window.$(this).removeClass('active')
        })
        active >= 0 ? '' : window.$(evt).find('.js-title').addClass('active')
      }
    }
  }
</script>

<style scoped>
  .custom-href {
    display: block;
    /*text-align: center;*/
    color: #bfcbd9;
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    font-size: 14px;
  }
  .item-txt {
    padding-left: 8px;
  }
  .custom-href:hover{
    background: #48576a
  }
  .layout-logo-left {
    width: 80%;
    height: 30px;
    border-radius: 3px;
    margin: 10px auto;
  }

  .el-menu {
    min-height: 100%;
  }

  .wscn-icon {
    margin-right: 10px;
  }

  .hideSidebar .title-link {
    display: inline-block;
    padding-left: 10px;
  }
  .custom-sidebar-item {}
  .el-menu--dark .el-submenu .el-menu {
    background: #fff;
  }
</style>
