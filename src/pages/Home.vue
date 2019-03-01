<template>
    <div>
      <Swiper v-if="swiperlist.length > 0" :autoPlay="false" class="mb16">
        <Slide v-for="(item,index) in swiperlist" :key="index" class="slider" >
          <img v-lazy="item.swiperImg" @click="pageToDetail(item)">
        </Slide>
      </Swiper>
      <div>
        <ul class="list ui-flex justify-space-between">
          <li v-for="(item,index) in productList" :key="index" @click="pageToDetail(item)">
            <div class="img-con">
              <img v-lazy="item.thumbnail">
            </div>
            <div class="desc">
              <h2>{{item.title}}</h2>
              <h4>{{item.subTitle}}</h4>
              <strong>￥{{item.price}}</strong>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { Swiper, Slide } from 'vue-swiper-component';
import {getSwiperList, getProductList} from '@/api/product'

export default {
  name: 'Home',
  data(){
    return {
      swiperlist:[],
      productList:[],
    }
  },
  created(){
    this.swiperlist = getSwiperList()
    this.productList = getProductList()
  },
  methods:{
    pageToDetail(obj){
      if(!obj.pid) return
      this.$router.push(`/productDetail/${obj.pid}`)
    }
  },
  components: {
    Swiper,
    Slide
  },
}
</script>
<style lang="scss" scoped>
  .slider{
    height:3.6rem;
    img{width:100%;height:100%;}
  }
  .list{
    background:#fff;
    flex-wrap:wrap;
    li{
      width:49.6%;
      .img-con{
        width:100%;height:3.72rem;
      }
      img{width:100%;height:100%;display:block;}
      .desc{
        padding:0.14rem 0.28rem 0.3rem;
      }
      h2{font-size:$f14;font-weight:normal;color:$font;margin-bottom:0.08rem;}
      h4{font-size:$f12;font-weight:normal;color:$font-sec;margin-bottom:0.04rem;}
      strong{font-size:$f14;font-weight:normal;color:$primary;margin-left:-0.06rem;}
    }
  }
</style>
