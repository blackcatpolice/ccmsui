import Cookies from 'js-cookie'
import * as types from '../mutation-types'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]'
  },
  mutations: {
    [types.SET_TOGGLE_SIDEBAR]: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    [types.SET_LIVENEWS_CHANNELS]: (status, channels) => {
      status.livenewsChannels = JSON.stringify(channels)
      Cookies.set('livenewsChannels', JSON.stringify(channels))
    }
  },
  actions: {
    ToggleSideBar: ({commit}) => {
      commit(types.SET_TOGGLE_SIDEBAR)
    },
    setlivenewsChannels: ({commit}, channels) => {
      commit(types.SET_LIVENEWS_CHANNELS, channels)
    }
  }
}

export default app
