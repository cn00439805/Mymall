import Vue from 'vue'
// state
const state = {
  keepalive:{
    include:[],
  },
  position:{
    list:{},
  },
}



// getters
const getters = {
  getPosition(state){
    return path => {
      let list = state.position.list
      return list[path] && list[path].position;
    }
  }
}

// mutations
const mutations = {
  addInclude(state, payload){
    if(payload === "") return
    let keepalive = state.keepalive
    let newSet = new Set(keepalive.include)
    newSet.add(payload)
    keepalive.include = [...newSet]
  },
  delInclude(state, payload){
    if(!payload) return
    let keepalive = state.keepalive
    let newSet = new Set(keepalive.include)
    newSet.delete(payload)
    keepalive.include = [...newSet]
  },
  setPosition(state,{path,scrollTop}){
    let list = state.position.list
    this.commit("setPath",path)
    Vue.set(list[path],'position',scrollTop)
  },
  delPosition(state,{path}){
    let list = state.position.list
    if(!list[path]) return
    delete list[path]
  },
  setPath(state,path){
    let list = state.position.list
    if(!list[path]){
      Vue.set(list,path,{})
    }
  },
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