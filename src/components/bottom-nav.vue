<template>
<div class="bottom_nav" v-if="isShow">
  <a v-for="item,i in nav" :class="getClass(item,name)" @click="pageTo(item.path)">
    <i :class="item.iconCls"></i>
    <span>{{item.title}}</span>
    <em class="bubble" v-if="!!trolleyNumber && (item.name === 'Trolley')">{{trolleyNumber}}</em>
  </a>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

let nav = [{
  title:"首页",
  iconCls:"iconfont icon-home",
  name:"Home",
  path:"/home",
},{
  title:"购物车",
  iconCls:"iconfont icon-cart4e",
  name:"Trolley",
  path:"/trolley",
},{
  title:"我的",
  name:"My",
  iconCls:"iconfont icon-user",
  path:"/my",
}]

export default {
  name: 'BottomNav',
  data () {
    return {
      nav,
    }
  },
  computed:{
    ...mapState({
      name: state => state.bottomNav.name,
      isShow: state => state.bottomNav.isShow,
    }),
    ...mapGetters([
      'trolleyNumber',
    ])
  },
  methods:{
    getClass(item,name){
      return {
        curr:item.name === name
      }
    },
    pageTo(path){
      this.$router.push({ 
        path,
      })
    },
    pageToChildren(leftPath){
      let path = `${this.$route.path}/${leftPath}`
      this.$router.push({ 
        path,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.bottom_nav {position: absolute;z-index:99;left:auto;right:auto;bottom:0;background: $con-bg;display: flex;width: 100%;height: 1.04rem;color: $font-sec;box-shadow:0 3px 14px 2px rgba(0,0,0,.12);max-width:$max-width;
  i{display: block;font-size:$f24;}
  a{position:relative;width: 100%;color:inherit;text-align: center;display: flex;flex-direction: column;justify-content: center;}
  span{display: block;font-size: $f11}
  & a.curr{color:$primary;}
  .bubble{position:absolute;top:0;left:50%;height:0.28rem;line-height:0.28rem;min-width:0.28rem;padding:0 0.05rem;border-radius:0.28rem;text-align:center;overflow:hidden;background:#ed4d41;color:#fff;font-size:0.18rem;font-style: normal;transform: translate3d(.1rem,.06rem,0);box-sizing:border-box;}
}
</style>
