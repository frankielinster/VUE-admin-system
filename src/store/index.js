import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  username: ''
}
const mutations = {
  setUserName: (state, uname) => {
    localStorage.setItem('username', uname)
    state.username = uname
  }
}
const actions = {}
const getters = {
  gettersName: state => localStorage.getItem('username')
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
