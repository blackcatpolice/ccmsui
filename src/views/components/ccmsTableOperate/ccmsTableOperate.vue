<template>
  <div class="box">
    <div class="top">
      <div class="tab-operate" >
        <el-tooltip class="item" v-show="scope.row.parentFlag" effect="dark" :content="$t('tableOperate.parentname')" placement="top">
          <el-button type="text"
                     @click.prevent="clickParent(scope.row)" size="small"><img src="./img/manager.png" /></el-button>
        </el-tooltip>
        <el-tooltip class="item" v-show="scope.row.recoverFlag" effect="dark" :content="t('tableOperate.recover')" placement="top">
          <el-button type="text"  @click.prevent="clickRecover(scope.row)">
            <img src="./img/undo.png" /></el-button>
        </el-tooltip>
        <el-tooltip class="item" v-show="scope.row.lookFlag" effect="dark" :content="t('tableOperate.look')" placement="top">
          <el-button type="text"  @click.prevent="clickLook(scope.row)" size="small"><img src="./img/see.png" class="icon"/></el-button>
        </el-tooltip>
        <el-tooltip class="item" v-show="scope.row.editFlag" effect="dark" :content="t('tableOperate.edit')" placement="top">
          <el-button type="text" size="small"  @click="clickEdit(scope.row)">
            <img src="./img/change.png" class="icon"/>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" v-show="scope.row.delFlag" :content="t('tableOperate.del')" placement="top">
          <el-button type="text"  @click.prevent="clickDel(scope.row)" size="small"><img src="./img/delete.png" class="icon"/></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" v-show="scope.row.resetPwdFlag" :content="t('tableOperate.reset_pwd')" placement="top">
          <el-button type="text"  @click.prevent="clickResetPwd(scope.row)" size="small"><img src="./img/loop.png" class="icon"/></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" v-show="scope.row.unLockUserFlag" :content="t('tableOperate.unlock')" placement="top">
          <el-button type="text"
                     @click.prevent="clickUnLockUser(scope.row)" size="small"><img src="./img/unlock.png" class="icon"/></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" v-show="scope.row.exchangeFlag" :content="t('tableOperate.exchange')" placement="top">
          <el-button type="text"
                     @click.prevent="clickExchange(scope.row)" size="small"><img src="./img/transfer_postition.png" class="icon"/></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" v-show="scope.row.intoSubSysFlag" :content="t('tableOperate.lookSubSysUser')" placement="top">
          <el-button type="text"
                     @click.prevent="clickIntoSubSys(scope.row)" size="small"><img src="./img/ios7-personadd-outline.png" class="icon"/></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
  import Locale from '../mixins/locale'
  export default{
    name: 'CcmsTableOperate',
    mixins: [Locale],
    props: {
      scope: [Object]
    },
    methods: {
      clickResetPwd (row) {
        this.$emit('clickResetPwd', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickResetPwd', data: row})
      },
      clickRecover (row) {
        this.$emit('clickRecover', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickRecover', data: row})
      },
      clickParent (row) {
        this.$emit('clickParent', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickParent', data: row})
      },
      clickLook (row) {
        this.$emit('clickLook', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickLook', data: row})
      },
      clickEdit (row) {
        this.$emit('clickEdit', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickEdit', data: row})
      },
      clickDel (row) {
        this.$emit('clickDel', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickDel', data: row})
      },
      // 调岗申请
      clickExchange (row) {
        this.$emit('clickExchange', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickExchange', data: row})
      },
      // 进入子用户
      clickIntoSubSys (row) {
        this.$emit('clickIntoSubSys', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickIntoSubSys', data: row})
      },
      // 解锁用户
      clickUnLockUser (row) {
        this.$emit('clickUnLockUser', row)
//        this.dispatch('CcmsTable', 'tabOperate', {evtName: 'clickUnLockUser', data: row})
      }
    }
  }
</script>
