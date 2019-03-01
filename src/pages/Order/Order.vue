<template>
  <div>
    <div class="b1 ui-flex align-center justify-center mb16">
      <a v-for="item,i in nav" :class="getClass(item)" @click="$router.replace(item.path)">
        <span>{{item.title}}</span>
      </a>
    </div>
    <transition name="fadeLeft">
      <keep-alive :include="include">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

let nav = [{
  title:"全部",
  name:"OrderAll",
  path:"/order/all",
},{
  title:"待付款",
  name:"PendingPay",
  path:"/order/pendingPay",
},{
  title:"待收货",
  name:"PendingReceive",
  path:"/order/pendingReceive",
}]

export default {
  name: 'Order',
  data(){
    return {
      nav,
    }
  },
  computed:{
    ...mapState({
      include: state => state.pages.keepalive.include,
    }),
  },
  methods:{
    getClass(item){
      return {
        curr:item.name === this.$route.name
      }
    },
  },
  components:{
    
  },
}
</script>
<style lang="scss" scoped>
  .b1{
    background: $white;
    a{display:block;width:2.5rem;text-align:center;font-size:$f14;}
    span{display:inline-block;padding:0.2rem 0.1rem;border-bottom:1px solid #fff;}
    a.curr{
      color:$primary;
      span{border-bottom:1px solid $primary;}
    }
  }
  .fadeLeft-enter{
     transform: translate3d(30%,0,0);
  }

  .fadeLeft-enter-active{
    transition: transform .2s;
  }
  .fadeLeft-leave-active{
    display:none;
  }

</style>