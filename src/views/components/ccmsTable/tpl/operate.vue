<template>
  <div class="ccms-table">
    <div v-if="customObj.type === 'text-btn'">
    <span class="operate color-primary" :scope="scope" v-if="item.flagId ? scope.row[item.flagId]: true" @click="btnClick(item)" v-for="(item, index) in customObj.btnList"> {{item.name}}</span>
    </div>
    <div v-if="customObj.type === 'icon-btn'">
      <ccms-table-operate v-on="$listeners" :scope="scope"></ccms-table-operate>
    </div>
  </div>
</template>
<script>
  import CcmsTableOperate from '../../ccmsTableOperate'
  export default{
    name: 'operate',
    components: {CcmsTableOperate},
    props: {
      scope: {
        type: Object,
        default: {}
      },
      customObj: {
        type: Object,
        default: {}
      }
    },
    methods: {
      btnClick (item) {
        this.dispatch('CcmsTable', 'tabOperate', { evtName: 'btnClick', data: {row: this.scope.row, item} })
      }
    }
  }
</script>
