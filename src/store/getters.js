const getters = {
  sidebar: state => state.app.sidebar,
  livenewsChannels: state => state.app.livenewsChannels,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  usrType: state => state.user.usrType,
  usrUid: state => state.user.usrUid,
  buttonArrs: state => state.permission.buttonArrs,
  localMsg: state => state.user.localMsg,
  pwd: state => state.user.pwd,
  sysIsBatch: state => state.user.sysIsBatch,
  originalRouterArr: state => state.permission.originalRouterArr,
  serverRootName: state => state.init.serverRootName,
  logOutUrl: state => state.init.logOutUrl,
  dialogue: state => state.init.dialogue,
  ajaxOptionsArr: state => state.init.ajaxOptionsArr
}
export default getters
