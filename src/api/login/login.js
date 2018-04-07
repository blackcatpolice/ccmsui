import { fetch } from '@/utils/network/fetch'
const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: '',
    name: 'Admin Wo'
  },
  editor: {
    role: ['editor', 'base', 'baseinfo', 'permission'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: '',
    name: 'editor'

  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: '',
    name: '工程师小王'
  }
}
export function loginByEmail (userName, password) {
  // 生产环境
  // return new Promise(resolve => {
  //   resolve({status: '1', msg: '测试'})
  // })
  // 测试环境
  return fetch({
    url: 'gnplLoginTrans.do?method=login',
    method: 'post',
    data: {usrUid: userName, usrPwd: password}
  })
}
// function factorial (obj, arr) {
//   if (obj.children && obj.children.length > 0) {
//     obj.children.filter(v => {
//       return factorial(v)
//     })
//   }
//   arr.push(obj.id)
// }
export function logout () {
  return fetch({
    url: 'loginTrans.do?method=logOff',
    method: 'post',
    data: {}
  })
}
export function delSession () {
  return fetch({
    url: 'loginTrans.do?method=delSession',
    method: 'post',
    data: {}
  })
}
// 获取菜单
export function getMenu (id) {
  return fetch({
    url: 'roleTrans.do?method=getMenuListByUserId',
    method: 'post',
    data: {userID: id}
  })
}
// 获取ｓｅｓｓｉｏｎ中用户信息
export function getLoginSessionSysUserEntity () {
  return fetch({
    url: 'gnplLoginTrans.do?method=getLoginSessionSysUserEntity',
    method: 'post',
    data: {}
  })
}
export function getInfo (config) {
  console.log(config, 'getInfo config=====')
  const token = config
  return new Promise((resolve, reject) => {
    if (userMap[token]) {
      setTimeout(() => {
        resolve([200, {
          data: userMap[token]
        }])
      }, 100)
    } else {
      reject('获取失败')
    }
  })
}

