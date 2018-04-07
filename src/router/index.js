import Vue from 'vue'
import Router from 'vue-router'
// layout
import Layout from '../views/pages/layout/Layout'
// dashboard
const dashboard = () => import('../views/pages/dashboard/index')
// error page
const Err404 = () => import('../views/pages/error/404')
const Err401 = () => import('../views/pages/error/401')
// login
import Login from '../views/pages/login/'

import form from './demo'

Vue.use(Router)
/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
// 这里配置白名单路由  === 'development'
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  // {path: '/test', component: testAddUser, hidden: true},
  {path: '/404', component: Err404, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{path: '/dashboard', name: 'router.index', component: dashboard}]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: 'router.errorPage',
    icon: '404',
    hidden: true,
    meta: {role: ['errorpage']},
    children: [
      {path: '401', component: Err401, name: '401'},
      {path: '404', component: Err404, name: '404'}
    ]
  },
  {path: '/demo',
    component: Layout,
    name: '组件',
    redirect: 'index',
    children: form},
  {path: '*', component: Err404, hidden: true}
]
export const asyncRouterMap = []
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

