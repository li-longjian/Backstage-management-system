import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isAuthentication :false,
  user:{}
}
const mutations = {

  setAuthentication(state,Authentication ){
    state.isAuthentication = Authentication
  },
  setAdmin(state,isAdmin){
    state.user.isAdmin = isAdmin;
  },
  setUser(state,user){
    if(user){
      state.user = user
    }else{
      state.user = {}
    }

  },
  clearUserInfo(state){
    state.user = {}
    state.isAuthentication = false
  }
}

export default new Vuex.Store({
  state,
  mutations
})
