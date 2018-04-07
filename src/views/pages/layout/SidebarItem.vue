<template>
  <div class="slidebar-item">
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
                   :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <!--<wscn-icon-svg v-if='item.icon' :icon-class="item.icon"/>-->
          <el-tooltip :visibleArrow="false" effect="slidebar-item_tooltip_wrap" placement="right">
            <div class="item-title">{{$t(item.children[0].name)}}</div>
            <div slot="content">{{$t(item.children[0].name)}}</div>
          </el-tooltip>
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <div class="sub-title js-title">
            <!--<wscn-icon-svg   v-if='item.icon' :icon-class="item.icon" />-->
            <el-tooltip :visibleArrow="false" rrow="false" effect="slidebar-item_tooltip_wrap"   placement="right">
            <div class="item-title"> {{$t(item.name)}}</div>
            <div slot="content"> {{$t(item.name)}}</div>
          </el-tooltip>
          </div>
          <div style="height: 2px;width: 100%;background: #fff"></div>
        </template>
        <div style="height: 2px;width: 100%;background: #fff"></div>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0'
                        :routes='[child]'></sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <el-tooltip :visibleArrow="false" effect="slidebar-item_tooltip_wrap" placement="right">
                <div class="item-title"> {{$t(child.name)}}</div>
                <div slot="content"> {{$t(child.name)}}</div>
              </el-tooltip>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    methods: {
    }
  }
</script>
<style>
  .slidebar-item .wscn-icon {
    margin-right: 10px;
  }
  .slidebar-item .item-title{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .slidebar-item .el-submenu .el-menu-item{
    min-width: 0px;
  }
  .slidebar-item .hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
  }
  .el-tooltip__popper.is-slidebar-item_tooltip_wrap{
    background: #fff;
    color: #666;
    border: 1px solid #ddd;
  }
  /*.is-slidebar-item_tooltip_wrap >div.popper__arrow:after{*/
    /*border-color: #108ee9;*/
  /*}*/
  /*#108ee9*/
</style>

