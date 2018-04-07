import { asyncRouterMap, constantRouterMap } from '@/router'
import {getMenu} from '../../api/login/login'
import * as types from '../mutation-types'
function hasPermissionMenu (arrs, route) {
  if (route.meta && route.meta.id) {
    return arrs.some(arr => route.meta.id === arr.menuId)
    // return route.meta.id !== 'CCMS_USER'
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    // 按钮权限
    buttonArrs: [],
    // 总的路由集合
    originalRouterArr: []
  },

  mutations: {
    [types.SET_ROUTERS]: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    [types.SET_BUTTONS]: (state, buttonArrs) => {
      state.buttonArrs = buttonArrs
    },
    [types.SET_ORIGINALROUTERARR]: (state, originalRouterArr) => {
      state.originalRouterArr = originalRouterArr
    }
  },

  actions: {
    SetRouter ({commit}, router) {
      // let moduleRoute = moduleRouter(originalRouterArr, moduleKey)
      commit(types.SET_ROUTERS, router)
    },
    GenerateRoutes ({commit}, data) {
      return new Promise(resolve => {
        getMenu(data.role).then(res => {
          const arrs = res.menuList
          commit(types.SET_BUTTONS, res.buttonList)
          const accessedRouters = asyncRouterMap.filter(v => {
            if (hasPermissionMenu(arrs, v)) {
              if (v.children && v.children.length > 0) {
                v.children = v.children.filter(child => {
                  if (hasPermissionMenu(arrs, child)) {
                    if (child.children && v.children.length > 0) {
                      child.children = child.children.filter(grandson => {
                        if (hasPermissionMenu(arrs, grandson)) {
                          return grandson
                        }
                        return false
                      })
                      return child
                    } else {
                      return child
                    }
                  }
                  return false
                })
                return v
              } else {
                return v
              }
            }
            return false
          })
          commit(types.SET_ROUTERS, accessedRouters)
          // commit('SET_ROUTERS', accessedRouters)
          // commit('SET_ORIGINALROUTERARR', accessedRouters)
          resolve()
        })
      })
    }
  }
}
export default permission
