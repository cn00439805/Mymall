<template>
  <div>
    <header>
      <div class="user">
        <div class="avatar" v-lazy-container="{ selector: 'img' }">
          <img :data-src="avatar.dataSrc" :data-loading="avatar.loading" >
        </div>
        <div class="name">
          <p>水彩涂鸦</p>
          <div class="account">6189662</div>
        </div>
      </div>
    </header>
    <div class="b1 ui-flex align-center justify-space-between bottom-line">
      <h2>我的订单</h2>
      <a href="javascript:;" @click="$router.push('order')">全部订单<i class="iconfont icon-dayuhao"></i></a>
    </div>
    <div class="b2 ui-flex align-center justify-space-between mb16">
      <a href="javascript:;"><i class="iconfont icon-daifukuan" @click="$router.push('/order/pendingPay')"></i><b>待付款</b></a>
      <a href="javascript:;"><i class="iconfont icon-daishouhuo" @click="$router.push('/order/pendingReceive')"></i><b>待收货</b></a>
      <a href="javascript:;"><i class="iconfont icon-tuihuanxiu" ></i><b>退换修</b></a>
    </div>
    <ul class="items mb16">
      <li class="ui-flex align-center">
        <i class="iconfont icon-huiyuanzhongxin icon-left"></i>
        <a href="javascript:;">会员中心<i class="iconfont icon-dayuhao"></i></a>
      </li>
      <li class="ui-flex align-center">
        <i class="iconfont icon-wodeyouhui icon-left"></i>
        <a href="javascript:;">我的优惠<i class="iconfont icon-dayuhao"></i></a>
      </li>
    </ul>
    <ul class="items mb16">
      <li class="ui-flex align-center">
        <i class="iconfont icon-fuwuzhongxin icon-left"></i>
        <a href="javascript:;">服务中心<i class="iconfont icon-dayuhao"></i></a>
      </li>
      <li class="ui-flex align-center">
        <i class="iconfont icon-shangpu icon-left"></i>
        <a href="javascript:;">服务网点<i class="iconfont icon-dayuhao"></i></a>
      </li>
    </ul>
    <ul class="items mb16">
      <li class="ui-flex align-center">
        <i class="iconfont icon-iconshezhi01 icon-left"></i>
        <a href="javascript:;">设置<i class="iconfont icon-dayuhao"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
import avatar from '@/assets/images/avatar.png'

export default {
  name: 'My',
  data(){
    return {
      avatar:{
        loading:avatar,
        dataSrc:"https://avatar-static.segmentfault.com/238/232/2382328808-5a154b5fb2c46_big64",
      },
      order:[
        {
          name:"全部",
          path:"",
        },
        {
          name:"待付款",
          path:"",
        },
        {
          name:"待收货",
          path:"",
        },
      ]
    }
  },
  created(){
    
  },
  methods:{

  },
  components:{

  },
}
</script>
<style lang="scss" scoped>
  .user{
    display: flex;align-items: center;background: url('~assets/images/1.png') center 0 #f37d0f;background-size: auto 100%;padding: 0.32rem 0;
  }
  .avatar{
    margin: 0 .16rem 0 .32rem;width: 1rem;height: 1rem;overflow: hidden;box-sizing: border-box;border-radius: 100%;border: 3px solid hsla(0,0%,100%,.4);text-align: center;position: relative;z-index: 45;
    img{width: auto;height: 110%;margin: 0 auto;transform: translate(-5%,-5%)}
  }
  .name{color: $white;font-size: $f12;text-align: left;.account{color: hsla(0,0%,100%,.6);}}
  .icon-dayuhao{font-size:0.52rem;font-weight:bold;}
  .b1{
    background:$white;height:0.8rem;border-bottom:$border;
    h2{font-size:0.32rem;font-weight: normal;padding-left:0.32rem;}
    a{
      display:inline-block;position:relative;font-size:0.28rem;padding-right:0.6rem;
      i{position:absolute;top:-0.12rem;right:0.12rem;}
    }
  }
  .b2{
    background:$white;padding:0 0.8rem;
    a{
      display:block;padding:0.4rem 0;text-align: center;
      i{display:block;font-size: 0.48rem;margin-bottom:0.1rem;}
      b{display:block;font-weight:normal;font-size:0.24rem;}
    }
  }
  .items{
    background:$white;
    li{
      position:relative;border-bottom:$border;
      .icon-left{width:1.12rem;display:block;font-size:0.48rem;text-align:center;}
      a{
        display:block;width:6.38rem;padding:0.4rem 0;
        .icon-dayuhao{position:absolute;right:0.16rem;top:50%;transform: translateY(-50%)}
      }
      
    }
    li:not(:first-child){
      border-bottom:none;
      &:before{content:"";position:absolute;left:0;top:-2px;width:1.12rem;height:3px;background: $white;}
    }
    li:last-child{border-bottom-color:$white;}
  }
  .icon-huiyuanzhongxin{color:#fdbf2d;}
  .icon-wodeyouhui{color:#51bbe0;}
  .icon-fuwuzhongxin{color:#f96c5e;}
  .icon-shangpu{color:#ff8b43;}
  .icon-iconshezhi01{color:#818c99;}
</style>
