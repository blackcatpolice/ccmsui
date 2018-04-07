<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
        <router-view :key="key" class="main-layout"></router-view>
    </transition>
  </section>

</template>
<style>
  .main-layout {
    margin-top: 70px;
    padding: 22px;
  }
</style>
<script>
  export default {
    name: 'AppMain',
    data () {
      return {
        activeName: '',
        editableTabs: [],
        // 是否删除tab
        isRemove: false,
        // 是否是 tabclick
        isTabClick: false,
//      网页刷新将打开的tab存入sessionStoarge 以便恢复
        ssTabs: []
      }
    },
    computed: {
      key () {
        return this.$route.name !== undefined
          ? this.$route.name + +new Date()
          : this.$route + +new Date()
      }
    },
    methods: {
    }
  }
</script>
