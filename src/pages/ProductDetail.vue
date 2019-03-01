<template>
  <div>
    <div class="detail">
      <div class="header ui-flex align-center justify-space-between">
        <a @click="goBack()" href="javascript:;" class="ui-flex align-center justify-center" ><i class="iconfont icon-xiaoyuhao"></i></a>
      </div>
      <div class="topImg">
        <img :src="detail.headImg">
      </div>
      <div class="con">
          <h2>{{detail.title}}</h2>
          <h4>{{detail.point}}</h4>
          <div class="amount">￥{{detail.price}}</div>
      </div>
      <div class="picDesc">
        <img v-for="item,i in detail.imgs" v-lazy="item">
      </div>
    </div>
    <div class="footer ui-flex align-center justify-space-between" v-if="isShowFooter">
      <div class="footer-left">
        <a @click="$router.push('/home')" href="javascript:;">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </a>
        <a @click="$router.push('/trolley')" href="javascript:;">
          <i class="iconfont icon-cart4e"></i>
          <span>购物车</span>
          <em class="bubble" v-if="!!trolleyNumber">{{trolleyNumber}}</em>
        </a>
      </div>
      <button @click="add()" class="btn" >加入购物车</button>
    </div>
  </div>
</template>

<script>
import {getProductDetail} from '@/api/product'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductDetail',
  data(){
    return {
      isShowFooter:true,
      pid:this.$route.params.id,
      detail:{},
    }
  },
  computed:{
    ...mapGetters([
      'trolleyNumber',
    ])
  },
  created(){
    if(this.$route.query.isHiddenFooter){
      this.isShowFooter = false
    }
    this.detail = getProductDetail(this.$route.params.id)
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    add(){
      this.$store.commit("addTrolleyProduct",{
        detail:this.detail,
        num:1
      })
    },
  },
  components:{
    
  },
}
</script>
<style lang="scss" scoped>
  .detail{
    position:relative;
  }
  .header{
    a{position:absolute;left:0.32rem;top:0.32rem;border-radius:50%;background:rgba(0,0,0,0.6);width:0.6rem;height:0.6rem;color:#fff;}
  }
  .topImg{
    img{width:100%;}
  }
  .con{
    background:#fff;
    padding:0.32rem;
    h2{font-size:$f22;font-weight:normal;color:#3c3c3c;margin-bottom:0.1rem;}
    h4{font-size:$f12;font-weight:normal;color:rgba(0,0,0,.54);word-break: break-all;line-height:1.5em;margin-bottom:0.16rem;}
    .amount{font-size:$f22;color:$primary;}
  }
  .picDesc{
    img{width:100%;display: block;margin-top:-0.02rem;}
  }
  .footer{
    position:absolute;bottom:0.16rem;left:0.16rem;right:0.16rem;box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);background:$white;height:1.04rem;border-radius:0.16rem;border:1px solid #e5e5e5;color: $font-sec;
    .footer-left{display: flex;height:100%;padding-left:0.2rem;}
    .btn{background:$primary;color:$white;padding:0 0.48rem;height:0.6rem;line-height:0.6rem;border-radius:0.32rem;margin-right:0.2rem;font-size:$f14;border:0 none;}
    i{display: block;font-size:$f24;}
    a{position:relative;width: 100%;height:100%;color:inherit;text-align: center;display: flex;flex-direction: column;justify-content: center;padding:0 0.4rem;}
    span{display: block;font-size: $f11;white-space: nowrap;}
    .bubble{position:absolute;top:0;left:50%;height:0.28rem;line-height:0.28rem;min-width:0.28rem;padding:0 0.05rem;border-radius:0.28rem;text-align:center;overflow:hidden;background:#ed4d41;color:#fff;font-size:0.18rem;font-style: normal;transform: translate3d(.1rem,.06rem,0);box-sizing:border-box;}
  }
</style>