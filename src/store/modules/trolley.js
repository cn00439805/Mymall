import Vue from 'vue'

// state
const state = {
  list:[],
}

// getters
const getters = {
  getTrolleyDetail(state){
    return (pid) => {
      let filterArr = state.list.filter(item => {
        return item.pid == pid
      })
      return filterArr.length?filterArr[0]:null
    }
  },
  trolleyNumber(state){
    if(!state.list.length) return 0
    let nums = state.list.map(item => item.num)
    let sum = nums.reduce((acc,curr) => {return acc + curr})
    return sum
  },
  trolleyAmount(state){
    if(!state.list.length) return 0
    let list = state.list, amount = 0;
    if(list.length < 2){
      amount = list[0].num * list[0].price
    }
    else{
      amount = state.list.reduce((prev,curr) => {
        prev += curr.num * curr.price
        return prev
      },amount)
    }
    return amount
  },
  hasChildren(state){
    return !!state.list.length
  },
}

// mutations
const mutations = {
  addTrolleyProduct(state, {detail,num}){
    detail = JSON.parse(JSON.stringify(detail))
    let filterDetail = this.getters.getTrolleyDetail(detail.pid)
    if(!filterDetail){
      detail.num = num
      state.list.push(detail)
      return
    }
    filterDetail.num += num
  },
  delTrolleyProduct(state,pid){
    let index;
    state.list.forEach((item,i) => {
      if(item.pid == pid){
        index = i
      }
    })
    if(index != null){
      state.list.splice(index,1)
    }
  },
  addTrolleyProductNumber(state,{pid,num}){
    let detail = this.getters.getTrolleyDetail(pid)
    let result = detail.num + num
    if(result > 99) return 
    detail.num = result
  },
  subTrolleyProductNumber(state,{pid,num}){
    let detail = this.getters.getTrolleyDetail(pid)
    let result = detail.num - num
    if(result <= 0 ) return 
    detail.num = result
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