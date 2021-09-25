import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters

  /*

  // state保存全局共享数据
  state: {
    isFullScreen: false
  },
  // 用于保存修改全局共享数据的方法
  mutations: {
    changeFullScreen (state, flag) {
      state.isFullScreen = flag
    }
  },
  // actions用于保存触发mutations中的方法
  actions: {
    setFullScreen ({ commit }, flag) {
      commit('changeFullScreen', flag)
    }
  },
  getters: {
    isFullScreen (state) {
      return state.isFullScreen
    }
  },
  modules: {
  }

  */
})
