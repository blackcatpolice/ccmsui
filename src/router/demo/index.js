/**
 * Created by sch on 2018/3/12.
 */
const form = (resolve) => require(['@/views/pages/form/form'], resolve)
const table = (resolve) => require(['@/views/pages/table/table'], resolve)
const card = (resolve) => require(['@/views/pages/card/card'], resolve)
const dialog = (resolve) => require(['@/views/pages/dialog/dialog'], resolve)
const inputDialog = (resolve) => require(['@/views/pages/dialog/inputDialog'], resolve)
const lookTable = (resolve) => require(['@/views/pages/table/ccmsLookTable'], resolve)
const pullTree = (resolve) => require(['@/views/pages/tree/pullTree'], resolve)
const dialogTree = (resolve) => require(['@/views/pages/tree/dialogTree'], resolve)
const timerShaft = (resolve) => require(['@/views/pages/timerShaft/timerShaft'], resolve)
const formItem = (resolve) => require(['@/views/pages/form/formItem.vue'], resolve)
const component = [
  {path: 'index', component: form, name: '表单组件'},
  {path: 'table', component: table, name: '表格组件'},
  {path: 'card', component: card, name: '卡片布局'},
  {path: 'dialog', component: dialog, name: '对话框'},
  {path: 'lookTable', component: lookTable, name: '详情'},
  {path: 'inputDialog', component: inputDialog, name: '输入弹出对话框'},
  {path: 'pullTree', component: pullTree, name: '下拉树'},
  {path: 'dialogTree', component: dialogTree, name: '对话框树'},
  {path: 'timerShaft', component: timerShaft, name: '时间轴'},
  {path: 'formItem', component: formItem, name: '表单项'}
]
export default component
