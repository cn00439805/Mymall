import axios from '@/axios'
import constant from '@/constant'

const state = {}
const mutations = {}
const actions = {}
Object.keys(constant.map).forEach((o,i) => {  //初始化state和mutations和actions
  state[o] = null
  mutations[`set${o}`] = function(mState,payload){
    mState[o] = payload
  }
  actions[o] = function({ commit }){
    return new Promise(function(resolve,reject){
      var params = {
        constant_type:constant.map[o].constant_type,
      }
      if(constant.map[o].constant_parent_id){
        params.constant_parent_id = constant.map[o].constant_parent_id
      }
      axios.get(constant.url,{
        params,
      }).then(res => {
        if(res.retCode === 100000){
          var data = res.data.map((o,i) => {
            return {
              parentId:o.parentId,
              value:o.id,
              label:o.label
            }
          })
          commit(`set${o}`,data)
          resolve(data)
        }
      }).catch(e => {
        reject(e)
      })
    })
  }
})

// getters
const getters = {
  //
}

export default {
  state,
  getters,
  actions,
  mutations
}