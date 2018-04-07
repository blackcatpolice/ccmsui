/**
 * Created by sch on 2018/3/12.
 */
export function login () {
  let res = {status: '1', msg: '登录成功'}
  return res
}
export function getLoginSessionSysUserEntity () {
  let userInfo = {
    userInfo: {
      usrType: '1',
      usrUid: 'test'
    },
    resultMsg: {
      localeMsg: 'zh_CN'
    }
  }
  return userInfo
}

export function getMenu () {
  let buttonList = []
  let menuList = []
  return {buttonList, menuList}
}
