<template>
  <div class="trolley-con" ref="trolley_con">
    <div class="no-product" v-if="!hasChildren">
      <a href="javascript:;" @click="$router.push('home')">
        <span>购物车还是空的</span>
        <em>去逛逛</em>
      </a>
    </div>
    <div class="trolley-list" :class="getClass" v-if="hasChildren">
      <transition-group name="list" tag="ul">
        <li class="ui-flex justify-start list-item" v-for="item,i in list" :key="item.pid">
          <a href="javascript:;" class="img-con" @click="pageToDetail(item)">
            <img :src="item.thumbnail">
          </a>
          <div class="desc-con ui-flex justify-center">
            <h2>{{item.title}}</h2>
            <strong>售价:<span>{{item.price}}</span>元</strong>
            <div class="ui-flex justify-space-between">
              <div class="num-box ui-flex">
                <div class="num-box-sub ui-flex align-center justify-center" @click="subNum(item)"><i class="iconfont icon-jianhao"></i></div>
                <div class="num-box-number">{{item.num}}</div>
                <div class="num-box-add ui-flex align-center justify-center" @click="addNum(item)"><i class="iconfont icon-jiahao"></i></div>
              </div>
              <a href="javascript:;" class="right-btn ui-flex align-center justify-center" @click="del(item)"><i class="iconfont icon-lajitong"></i></a>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
    <div class="trolley-list-bg-con" v-if="hasChildren"></div>
    <div class="bottom-bar" v-if="!btmNav.isShow" ref="bottom_bar">
      <div class="ui-flex align-center">
        <div class="amount">
          <h3>共{{trolleyNumber}}件 金额：</h3>
          <strong>{{trolleyAmount}}<span>元</span></strong>
        </div>
        <a href="javascript:;">去结算</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'Trolley',
  data(){
    return {
      btmNav:{
        isShow:true
      },
    }
  },
  mounted(){
    if(!this.btmNav.isShow){
      let container = document.querySelector(".container")
      let bottom_bar = this.$refs.bottom_bar;
      container.appendChild(bottom_bar)
    }
  },
  beforeDestroy(){
    let trolley_con = this.$refs.trolley_con;
    let bottom_bar = this.$refs.bottom_bar;
    trolley_con.appendChild(bottom_bar)
  },
  computed:{
    getClass(){
      return {
        "has-trolley-bottom":!this.btmNav.isShow,
      }
    },
    ...mapState({
      list: state => state.trolley.list,
    }),
    ...mapGetters([
      "hasChildren",
      "trolleyNumber",
      "trolleyAmount",
    ]),
  },
  methods:{
    addNum(detail){
      this.$store.commit("addTrolleyProductNumber",{
        pid:detail.pid,
        num:1,
      })
    },
    subNum(detail){
      this.$store.commit("subTrolleyProductNumber",{
        pid:detail.pid,
        num:1,
      })
    },
    del(detail){
      this.$store.commit("delTrolleyProduct",detail.pid)
    },
    pageToDetail(obj){
      if(!obj.pid) return
      this.$router.push(`/productDetail/${obj.pid}`)
    },
  },
  watch:{
    '$store.state.trolley.list':{
      handler(list, oldList) {
        this.btmNav.isShow = !list.length
      },
      immediate: true,
      deep: true,
    },
    'btmNav.isShow':{
      handler(isShow) {
        this.$store.commit("changeVisible",isShow)
      },
      immediate: true,
    }
  },
}
</script>
<style lang="scss" scoped>
  .no-product{
    position:absolute;left:0;top:0;right:0;bottom:0;text-align:center;padding-top:2.6rem;height:100%;background:#f6f6f6;
    a{display:inline-block;font-size:$f12;text-align:center;}
    span{display:inline-block;line-height:.8rem;background:url('~assets/images/trolley_empty.png') no-repeat 0;background-size: auto 100%;padding:0 .16rem 0 .96rem;color:rgba(0,0,0,.27);margin-bottom:0.4rem;}
    em{display:block;font-style: normal;border:1px solid rgba(0,0,0,.15);height:.5rem;line-height:.5rem;padding:0 .24rem;color:rgba(0,0,0,.87);}
  }
  .trolley-list{
    position:relative;z-index:2;background:#fff;
    li{
      border-bottom:1px solid #f6f6f6;padding:0.2rem;
      h2{font-size:$f16;font-weight:normal;color:$font;margin-bottom:.08rem;}
      strong{font-size:$f14;font-weight:normal;color:$font-sec;}
    }
    .img-con{
      border:1px solid #eee;width:1.8rem;height:1.8rem;margin-right:.2rem;
      img{width:100%;height:100%;display: block;}
    }
    .desc-con{
      flex-grow:1;flex-direction:column;
      strong{margin-bottom:.06rem;}
      .num-box{
        i{color:#777;font-size:$f12;}
      }
      .num-box-sub{width:.6rem;height:.6rem;line-height:.6rem;background:#f4f4f4;text-align:center;border:1px solid #eee;border-right:0 none;}
      .num-box-number{width:.6rem;height:.6rem;line-height:.6rem;text-align:center;border:1px solid #eee;border-left:0 none;border-right:0 none;}
      .num-box-add{width:.6rem;height:.6rem;line-height:.6rem;background:#f4f4f4;text-align:center;border:1px solid #eee;border-left:0 none;}
      .right-btn{
        width:.6rem;height:.6rem;
        i{font-size:$f20;}
      }
    }
  }
  .trolley-list-bg-con{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;background:$white;z-index:1;}
  .bottom-bar{
    position:absolute;z-index:5;left:0;right:0;bottom:0;box-shadow:0 3px 14px 2px rgba(0,0,0,.12);background:$white;
    .amount{
      width:100%;height:100%;text-align:center;
      h3{font-weight:normal;font-size:$f14;color:$font-sec;}
      strong{font-weight:bold;font-size:$f20;color:$primary;}
      span{font-weight:normal;font-size:$f14;color:$font-sec;padding-left:.1rem;}
    }
    a{display:block;width:100%;text-align:center;background:$primary;line-height:1rem;color:$white;}
  }
  .has-trolley-bottom{padding-bottom:1rem;}
  /*list 动画*/
  .list-item {transition: all .6s;}
  .list-leave-to{opacity: 0;transform: translateX(-100%);}
  .list-leave-active{position: absolute;}
</style>
