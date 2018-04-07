// import {loginByEmail, logout, getInfo} from '../../api/login'
import {loginByEmail, getLoginSessionSysUserEntity} from '../../api/login/login'
import * as types from '../mutation-types'
const user = {
  state: {
    // 用户类别
    usrType: '',
    usrUid: '',
    pwd: {},
    localMsg: '',
    // 是否正在批量
    sysIsBatch: {
      msg: '',
      show: false
    }
  },

  mutations: {
    [types.SET_USR_UID] (state, usrUid) {
      state.usrUid = usrUid
    },
    [types.SET_USR_TYPE] (state, usrType) {
      state.usrType = usrType
    },
    [types.SET_PWD] (state, pwd) {
      state.pwd = pwd
    },
    [types.SET_LOCAL_MSG] (state, localMsg) {
      state.localMsg = localMsg
    },
    [types.SET_SYS_IS_BATCH] (state, sysIsBatch) {
      state.sysIsBatch = sysIsBatch
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail ({commit}, userInfo) {
      const email = userInfo.usrUid
      return new Promise((resolve, reject) => {
        loginByEmail(email, userInfo.usrPwd).then(response => {
          const data = response
          // Cookies.set('X-Ivanka-Token', response.data.token)
          resolve(data)
          // commit('SET_EMAIL', email)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        getLoginSessionSysUserEntity().then(vals => {
          let val = vals.userInfo || {}
          let result = vals.resultMsg
          let pwd = vals.pwd
          let noUserInfo = vals.noUserInfo
          if (noUserInfo) {
            val['noUserInfo'] = noUserInfo
            resolve(val)
            return
          }
          if (pwd) {
            val['pwd'] = pwd
            commit(types.SET_PWD, pwd)
          }
          // 用户还未登录
          if (vals.status === '99' || val.usrUid === '') {
            resolve(vals)
          } else {
            commit(types.SET_LOCAL_MSG, result.localeMsg)
            commit(types.SET_USR_TYPE, val.usrType)
            commit(types.SET_USR_UID, val.usrUid)
            resolve(val)
          }
        })
      })
    },
    // 设置usrUid
    SetUsrUid ({commit}, usrUid) {
      commit(types.SET_USR_UID, usrUid)
    },
    // 设置是否批量
    SetSysBatch ({commit}, sysIsBatch) {
      commit(types.SET_SYS_IS_BATCH, sysIsBatch)
    }
  }
}

export default user
