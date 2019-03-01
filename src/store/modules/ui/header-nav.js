// state
const state = {
  isShow:null,
}

// getters
const getters = {
  //
}

// mutations
const mutations = {
  changeHeaderVisible(state, isShow) {
    state.isShow = isShow
  },
  setHeaderNav(state, toPage){
    let headerNav = toPage.meta.headerNav
    if(!headerNav){
      this.commit("changeHeaderVisible",false)
    }
    else{
      this.commit("changeHeaderVisible",!!headerNav.isShow)
    }
  }
}

// actions
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}