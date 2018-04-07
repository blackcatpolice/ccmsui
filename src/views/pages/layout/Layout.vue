<template>
  <div id="layout">
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container"/>
    </div>
    <div class="main-container">
      <Navbar/>
      <App-main/>
    </div>
  </div>
    <img src="../../../assets/img/dialogue.png" style="position: fixed;bottom: 15px;right: 5px;height: 180px;cursor: pointer;z-index: 999" :title="$t('dialogue')" @click="goDialogue" id="move">
    <div id="dialog">
      <el-dialog :visible.sync="dialogTableVisible" :title="$t('dialogue')">
        <iframe :src=url width="900px" height="668px" style="border: none;"></iframe>
      </el-dialog>
    </div>
    <div style="height: 18px;line-height: 18px;margin-top: 10px;width: 100%;text-align: center;border:1px solid #ddd;position: fixed;bottom:0;background: #fff;color:#777;font-size: 12px;">
      <span>© copyright 中国银行软件中心  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系我们：系统维护/风险管理部/总行/BOC</span>
    </div>
    <div class="mask-batch" v-if="sysIsBatch.show"></div>
    <div class="box-batch-wraper" v-if="sysIsBatch.show">
      <div class="box-batch">
        <!--<div class="box-batch-header">-->
          <!--<div class="box-batch-title">提示</div>-->
        <!--</div>-->
        <div class="box-batch-content">
          <div class="box-batch-status el-icon-warning"></div>
          <div class="box-batch-message">
            <p>{{sysIsBatch.msg}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from '@/views/pages/layout'
  import { mapGetters } from 'vuex'
  // import { Loading } from 'element-ui';
  // let loadingInstance;
  export default {
    name: 'layout',
    data () {
      return {
        dialogTableVisible: false,
        url: ''
      }
    },
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    watch: {
      sysIsBatch (val) {
        if (val.show) {
          document.body.style.overflow = 'hidden'
        }
      }
    },
    computed: {
      ...mapGetters([
        'sysIsBatch',
        'usrUid'
      ]),
      sidebar () {
        return this.$store.state.app.sidebar
      }
    },
    mounted () {
      this.url = window.dialogue + '?sysid=CCMS-G&username=' + this.usrUid
    },
    methods: {
      goDialogue () {
        this.dialogTableVisible = true
      },
      move (e) {
        window.$('#move').css({'left': e.pageX, 'top': e.pageY})
      }
    }
  }
</script>
<style scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    padding-left: 180px;
  }
  .app-wrapper:after {
     content: "";
     display: table;
     clear: both;
   }

  .app-wrapper.hideSidebar {
    padding-left: 40px;
  }

  .app-wrapper.hideSidebar .sidebar-wrapper {
    transform: translate(-140px, 0);
    background: #fff;
  }

  .app-wrapper.hideSidebar .sidebar-wrapper .sidebar-container {
    transform: translate(132px, 0);
    background: #fff;
  }

  .app-wrapper.hideSidebar .sidebar-wrapper:hover {
    transform: translate(0, 0);
    z-index: 1001;
  }

  .app-wrapper.hideSidebar .sidebar-wrapper:hover .sidebar-container {
    transform: translate(0, 0);
  }

  .app-wrapper .sidebar-wrapper {
    width: 180px;
    position: fixed;
    top: 94px;
    bottom: 43px;
    left: 0;
    z-index: 2;
    background: #fff;
    overflow-x: hidden;
    transition: all .28s ease-out;
  }

  .app-wrapper .sidebar-wrapper::-webkit-scrollbar-track-piece {
     background: #d3dce6;
   }
  .app-wrapper .sidebar-wrapper::-webkit-scrollbar {
     width: 6px;
   }
  .app-wrapper .sidebar-wrapper::-webkit-scrollbar-thumb {
     background: #99a9bf;
     border-radius: 20px;
   }

  .app-wrapper .sidebar-container {
    transition: all .28s ease-out;
    background: #fff;
  }

  .app-wrapper .main-container {
    width: 100%;
    min-height: 100%;
    transition: all .28s ease-out;
  }
  .mask-batch {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    left: 0px;
    top:80px;
    z-index: 3000;
  }
  .box-batch {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    width: 420px;
    height: 178px;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .box-batch-wraper {
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3001;
  }
  .box-batch-wraper:after{
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .box-batch-header{
    position: relative;
    padding: 20px 20px 0
  }
  .box-batch-title{
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: 18px;
    color: #333;
  }
  .box-batch-content{
    /*padding: 30px 20px;*/
    color: #48576a;
    height: 50px;
    top: 50%;
    margin-top: -25px;
    font-size: 14px;
    text-align: center;
    position: relative;
  }
  .box-batch-status{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 36px!important;
  }
  .el-icon-warning{
    color: #f7ba2a;
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased
  }
  .box-batch-message {
    display: inline-block;
    margin-left: 50px;
  }


</style>
<style>
  #layout #dialog .el-dialog__body {
    padding:0;
  }
  #layout #dialog .el-dialog--small {
    width: 900px
  }
</style>
