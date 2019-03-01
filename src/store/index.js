import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import headerNav from './modules/ui/header-nav'
import bottomNav from './modules/ui/bottom-nav'
import pages from './modules/pages'
import trolley from './modules/trolley'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer(val) {
      return {
        trolley: val.trolley
      }
    }
  })] ,
  state: {
    
  },
  mutations: {
    
  },
  modules: {
    headerNav,
    bottomNav,
    pages,
    trolley,
  }
})
