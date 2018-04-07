import axios from 'axios'
import Tips from '../tipsUtil'
import sysCode from './sysCode'
import store from '../../store'
import {proxyIpMap} from '../../../test/proxyIpConfig'
// ajax超时不需要提示的白名单
const timeOutWhiteList = ['loginTrans.do?method=delSession']
// 前端配置还没获取完成 就进行了ajax请求 先保存
export function fetch (options) {
  // 判断是否有mock
  if (process.env.NODE_ENV) {
    for (let key in proxyIpMap) {
      if (options.url === key) {
        let obj = proxyIpMap[key]
        options.url += '&name=' + obj.name
        if (obj.func && obj.mock) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(obj.func())
            }, 500)
          })
        }
      }
    }
  }
  // 将data做一层处理  + '&' + new Date().getTime()
  options.url = store.getters.serverRootName + options.url + '&' + new Date().getTime()
  options.data = 'body=' + encodeURIComponent(JSON.stringify(options.data))
  return new Promise((resolve, reject) => {
    let instance
    let time = 50000
    instance = axios.create({
      timeout: time // 超时
    })
    instance(options)
      .then(response => {
        const res = response.data
        if (res && res.responseHeader) {
          getScence(res.responseHeader.resultCode, res, resolve)
        }
      })
      .catch(error => {
        if (!timeOutWhiteList.filter(str => str === options.url).length) {
          Tips.error('发生异常错误,请刷新页面重试,或联系管理员')
        }
        resolve(error)
      })
  })
}
export function fetchConfig (options) {
  return new Promise((resolve, reject) => {
    let instance
    let time = 50000
    instance = axios.create({
      timeout: time // 超时
    })
    instance(options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        resolve(error)
      })
  })
}
function getScence (code, res, resolve) {
  switch (code) {
    case sysCode.SUCCESS_CODE:
    case sysCode.ERROR_CODE:
    case sysCode.SYS_ERROR_CODE:
      // 需要登录
      if (res.returnObj.status === sysCode.RELOGIN) {
        if (process.env.NODE_ENV === 'development') {
          resolve(res.returnObj)
        } else {
          window.location.href = store.getters.logOutUrl
        }
      } else {
        resolve(res.returnObj)
      }
      break
    // case sysCode.ERROR_CODE:  暂时合并处理
    //   break
    // case sysCode.SYS_ERROR_CODE:
    //   break
    case sysCode.BIZ_ERROR_CODE:
      // 系统正在批量
      if (res.returnObj.status === sysCode.SYSBATCH) {
        store.dispatch('SetSysBatch', {msg: res.returnObj.msg, show: true})
      }
      resolve(res.returnObj)
      break
    case sysCode.SESSION_INVALDIDTE:
      window.location.href = res.returnObj
      break
  }
}
