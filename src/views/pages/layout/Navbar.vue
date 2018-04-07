
<template>
  <div>
    <div class="wrapper-logo">
    </div>
  <el-menu class="navbar" mode="horizontal">
    <!--<Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>-->
    <levelbar></levelbar>
    <ccms-err-log v-if="log.length>0" class="errLog-container" :logsList="log"></ccms-err-log>
    <div class="wrapper-logo" style="float: left;">
    </div>
  </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Levelbar from './Levelbar'
//  import Hamburger from '@/components/Hamburger'
//  import ErrLog from '@/components/ErrLog'
  import errLogStore from '@/store/errLog'
  import logo from '@/assets/img/logo.png'
  import {delSession} from '@/api/login/login'
//  import Tool from '@/utils/tool.js'
  // 选择用户登录子系统时必备的字段
//  const chooseUserProArr = ['sysId', 'sysName', 'url', 'useRefList']
  // import config from '/static/ccmsconfig/config.js'
  export default {
    components: {
      Levelbar
    },
    data () {
      return {
        logo: logo + '?' + +new Date(),
        log: errLogStore.state.errLog,
        isdot: true,
        logOutUrl: window.logOutUrl,
        ccms_G: window.ccms_G,
        ccms_O: window.ccms_O,
        dVisible: false,
//        用户列表
        userList: [],
        // 选择的用户
        userRadio: '',
        targetUrl: '',
        // 选择要进入的子系统的数组
        selectIntoSubSysList: [],
        // 是否要显示进入子系统的弹框
        subSysVisible: false,
        // 激活的卡片名称
        subSysActiveName: '',
        // usemodel 所选择的用户
        useModel: ''
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'usrUid',
        'avatar',
        'tipsMsg'
      ])
    },
    mounted () {
      this.loginChooseUser()
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('ToggleSideBar')
      },
      linkChina () {
      },
      linkOcean () {

      },
      linkSlow () {
      },
      logoutSSO () {
        delSession().then(val => {
        })
//        debugger
        window.location.href = window.logOutUrl
        // 单点登录
      },
      comFirm () {
        window.location.href = this.targetUrl + '&username=' + this.userRadio
      },
      // 是否显示用户的弹框
      isShowUserBox (val) {
        this.targetUrl = val.url
        let len = val.list.length
        this.userList = val.list
        if (len > 1 && val.url) {
          this.dVisible = true
          this.setShowBatch(false)
          return
        }
        this.userRadio = val.list[0].sysUsrname
        // 如果只有一个用户 则直接跳过
        this.comFirm()
      },
//    关闭对话框
      dialogClose () {
        this.setShowBatch(true)
      },
      // 设置是否显示批量的框
      setShowBatch (isShow) {
        // 批量的信息为空就不显示
        if (!this.$store.getters.sysIsBatch.msg) return
        this.$store.getters.sysIsBatch.show = isShow
        // 消除批量的弹框
        this.$store.dispatch('SetSysBatch', this.$store.getters.sysIsBatch)
      },
      /**
       * 下拉菜单隐藏显示
       * @param isVisible 是否显示
       */
      dropDownChange (isVisible) {
        if (isVisible) {
          this.setShowBatch(false)
        } else {
          this.setShowBatch(true)
        }
      },
      toHome () {
        this.$router.push('/')
      },
      // 登录选择用户
      loginChooseUser () {
//        navbarApi.loginChooseUser().then(val => {
//          if (val.status === '1') {
//            this.subSysVisible = true
//            this.selectIntoSubSysList = Tool.ArrayInEveryObjNotTargetProThenAdd(val.msg, chooseUserProArr)
//            this.subSysActiveName = this.selectIntoSubSysList[0].sysId
//          }
//        })
      },
      // 点击选中的卡片
      clickSelectedSubSys (tab) {
        this.useModel = ''
        this.subSysActiveName = tab.name
      },
      // 根据tab name获取整个对象
      getSelectObjByName (tabName) {
        for (let i = 0; i < this.selectIntoSubSysList.length; i++) {
          let selectUser = this.selectIntoSubSysList[i]
          if (selectUser.sysId === tabName) {
            return selectUser
          }
        }
        return {}
      },
      // 点击进入子系统的关闭按钮
      subSysClose () {},
      // 点击进入子系统的确定按钮
      subSysComFrim () {
        let url = this.getSelectObjByName(this.subSysActiveName).url
        window.location.href = url + '&username=' + this.useModel
      }
    }
  }
</script>
<style rel="stylesheet/css" scoped>
  .list-navbar .el-dropdown {
    float: right;
  }
  .list-navbar{
    float: right;
    width: 100%;
    margin-right: 20px;
  }
  .list-navbar:after{
    *zoom: 1;
    content: '';
    clear: both;
    display: table;
  }
  .navbar {
    width: 100%;
    height: 70px;
    line-height: 50px;
    border-radius: 0px !important;
    background: url('../../../assets/img/topbg.png');
    border-bottom: 1px solid #d1dbe5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .wrapper-logo {
    /*width: 450px;*/
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 69px;
    background: url('../../../assets/img/topbg.png') no-repeat left;
  }
  .wrapper-logo img {
    width: 90%;
  }
  .msg-domestic, .msg-overseas {
    height: 30px;
    display: inline-block;
    line-height: 0;
    margin: 20px auto;
    padding: 0 25px;
    border-right: 2px solid rgba(255,255,255,.5);
    float: right;
  }
  .navbar .msg-domestic .avatar-wrapper,  .navbar .msg-overseas .avatar-wrapper{
    position: relative;
    top: -6px;
  }
  .navbar .msg-domestic .avatar-wrapper .user-avatar,  .navbar .msg-overseas .avatar-wrapper .user-avatar{
    padding: 0 12px 6px 12px;
    margin: 5px auto;
    width: 50px;
    height: 30px;
    display: block;
  }
  .msg-ccms-d {font-size: 12px;color:#fff;display: block;}
  .msg-container {
    height: 30px;
    display: inline-block;
    cursor: pointer;
    margin-top: 20px;
    border-right: 2px solid rgba(255,255,255,.5);
  }
  .msg-container .avatar-wrapper {
    margin: 5px 25px 0;
    line-height: normal;
  }
  .navbar .hamburger-container {
    line-height: 70px;
    height: 70px;
    float: left;
    padding: 0 10px;
    color: #fff;
  }

  .navbar .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }

  .navbar .avatar-container {
    height: 40px;
    display: inline-block;
    margin: 13px 2% 0 2%;
    float: right;
  }

  .navbar .avatar-container .avatar-wrapper {
    cursor: pointer;
    position: relative;
  }

  .navbar .avatar-container .avatar-wrapper .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    vertical-align: middle;
  }

  .navbar .avatar-container .avatar-wrapper .avatar-text {
    margin: 0 20px;
    line-height: 40px;
    /*vertical-align: text-bottom;*/
    color: #fff;
  }

  .navbar .avatar-container .avatar-wrapper .el-icon-caret-bottom {
    position: absolute;
    right: -15px;
    top: 18px;
    font-size: 12px;
  }
  .home-page {
    font-size: 16px;
    line-height: 35px;
    color:#fff;
    cursor: pointer;
  }
</style>
