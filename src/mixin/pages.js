import Vue from 'vue'
import store from '@/store'

Vue.mixin({
  created(){
    let $main = document.querySelector(".main")
    if(!$main) return
    $main.scrollTop = 0
  },
  activated(){
    let $main = document.querySelector(".main")
    if(!$main) return
    let path = this.$route.path
    let scrollTop = store.getters.getPosition(path)
    $main.scrollTop = scrollTop?scrollTop:0
  },
})