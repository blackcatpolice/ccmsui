<template>
  <div class="ccms-card-tabs">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(tabPane, index) in tabs" :key="index" :label="tabPane.label" :name="tabPane.name">
        <div class="tab-pane" >
          <keep-alive>
          <components v-if="currentIndex === index" :is="tabPane.component"></components>
          </keep-alive>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  export default{
    name: 'CcmsTabs',
    data () {
      return {
        activeName: this.tabs[0] ? this.tabs[0].name : '',
        currentIndex: 0
      }
    },
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      default: []
    },
    methods: {
      handleClick (data) {
        this.currentIndex = parseInt(data.index)
        this.$emit('handleClick', data)
      }
    }
  }
</script>
