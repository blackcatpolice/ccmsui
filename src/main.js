// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import babel from 'babel-polyfill'
import axios from 'axios'
import Vuex from 'vuex'
import directive from '@/utils/directive'
import CcmsUi from '@/views/components/index'
// import 'ccms-ui/dist/ccms-ui.css'
import {setLocal} from '@/i18n/index.js' // ccms国际化
// import '@/mock/index.js'  // 使用api请求时请将此行注释，不然将被mock拦截
import store from './store'
import NProgress from 'nprogress'
import '@/assets/css/index.css'
import '@/views/components/Icon-svg/index'
import '@/assets/iconfont/iconfont'
import 'nprogress/nprogress.css'
import CcmsEmmitter from '@/mixin/ccmsEmitter.js'
import Mixin from '@/mixin/mixin.js'
Vue.use(element)
Vue.use(babel)
Vue.use(Vuex)
Vue.use(CcmsUi)
Vue.use(directive)
axios.defaults.baseURI = '/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.config.productionTip = false
Vue.prototype.previousPage = function () {
  router.back()
}
// register global progress.
// 白名单的路径
const whiteList = ['/repeatUser']// 不重定向白名单
// let rePwd = false
let islogin = false
// let rePwd = false
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (islogin) {
    islogin = false
    next()
    NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  }
  console.log(store.getters.usrUid, 'usrUid')
  // 未登录
  if (!store.getters.usrUid) {
    if (whiteList.filter(item => to.path.indexOf(item) >= 0).length) {
      next()
      NProgress.done()
      return
    }
    store.dispatch('GetInfo').then(res => {
      // 国际化 从后台获取
      setLocal(store.getters.localMsg || 'zh_CN')
      // setLocal('en_US')
      if (res.status === '99') {
        islogin = true
        // 测试环境 /login
        // 生产环境 /404
        // next('/404')
        //                跳转到登录界面
        next('/login')
        // window.location.href = window.logOutUrl
        return
      }
      // setLocal('en_US')
      const role = res.usrUid
      const moduleKey = to.path.replace('/', '')
      store.dispatch('GenerateRoutes', {role, moduleKey}).then(() => { // 生成可访问的路由表
        // store.dispatch('SetRole', role)
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next(to.fullPath) // hack方法 确保addRoutes已完成
      })
    }).catch(err => {
      console.log(err)
    })
  } else {
    if (to.path === '/login') {
      // next({path: '/'})
      window.location.href = window.logOutUrl
    } else {
      next()
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
setLocal()
// 国际化
//  const i18n = createI18n('zh_CN')
/* eslint-disable no-new */
Vue.mixin(CcmsEmmitter)
Vue.mixin(Mixin)

window.$vue = new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  template: '<App/>',
  components: {App}
})
