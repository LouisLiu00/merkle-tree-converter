import { createStore } from 'vuex'
import data from './modules/data'
import user from './modules/user'

// 参考：https://vuex.vuejs.org/zh/guide/modules.html
export default createStore({
  state: { },
  getters: { },
  mutations: { },
  actions: { },
  modules: { data, user }
})
