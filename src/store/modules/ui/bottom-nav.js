
const names = ["Home","Trolley","My"]

// state
const state = {
  isShow:null,
  name:"",
}

// getters
const getters = {
  //
}

// mutations
const mutations = {
  changeVisible(state, isShow) {
    state.isShow = isShow
  },
  setNav(state, name){
    if(names.includes(name)){
      state.name = name
    }
  },
  setBottomNav(state, toPage){
    if(names.includes(toPage.name)){
      this.commit("changeVisible",true)
      this.commit("setNav",toPage.name)
      return
    }
    let btmNav = toPage.meta.btmNav
    if(!btmNav){
      this.commit("changeVisible",false)
    }
    else{
      this.commit("changeVisible",!!btmNav.isShow)
      if(btmNav.showName){
        this.commit("setNav",btmNav.showName)
      }
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