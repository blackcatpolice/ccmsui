/**
 * Created by sch on 2017/12/18.
 */
import * as types from '../mutation-types'
const init = {
  state: {
    serverRootName: '',
    logOutUrl: '',
    dialogue: '',
    ajaxOptionsArr: []
  },
  mutations: {
    [types.SET_SERVER_ROOT_NAME]: (state, serverRootName) => {
      state.serverRootName = serverRootName
    },
    [types.SET_LOG_OUT_URL]: (state, logOutUrl) => {
      state.logOutUrl = logOutUrl
    },
    [types.SET_DIALOGUE]: (state, dialogue) => {
      state.dialogue = dialogue
    },
    [types.SET_AJAX_OPTIONS_ARR]: (state, ajaxOptionsArr) => {
      state.ajaxOptionsArr = ajaxOptionsArr
    }
  },
  actions: {
    initConfig ({commit}, config) {
      commit(types.SET_SERVER_ROOT_NAME, config.serverRootName)
      commit(types.SET_LOG_OUT_URL, config.logOutUrl)
      commit(types.SET_DIALOGUE, config.dialogue)
    },
    setAjaxOptionsArr ({commit}, option) {
      commit(types.SET_AJAX_OPTIONS_ARR, option)
    }
  }
}
export default init
