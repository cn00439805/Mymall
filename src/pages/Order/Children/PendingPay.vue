<template>
  <div>
    <ul class="prod-list">
      <li v-for="item,i in list" class="mb16" @click="">
        <div class="header ui-flex justify-space-between">
          <div>
            <h2><strong>订单日期：</strong><span>{{item.date}}</span></h2>
            <h4><strong>订单编号：</strong><span>{{item.orderNo}}</span></h4>
          </div>
          <em>{{item.statusDesc}}</em>
        </div>
        <div class="list">
          <dl v-for="item2,i2 in item.list" class="ui-flex justify-start align-center"  @click="pageToDetail(item2)">
            <dt>
              <img :src="item2.img">
            </dt>
            <dd>{{item2.desc}}</dd>
          </dl>
        </div>
        <div class="amount ui-flex justify-end align-center">
          <span>共{{item.count}}件商品</span><em>总金额：</em><strong>{{item.account}}</strong>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getOrderPendingPayList} from '@/api/order'

let list = getOrderPendingPayList()

export default {
  name: 'OrderAll',
  data(){
    return {
      list,
    }
  },
   methods:{
    pageToDetail(obj){
      if(!obj.pid) return
      this.$router.push({
        path:`/productDetail/${obj.pid}`,
        query:{
          isHiddenFooter:true,
        }
      })
    }
  },
  components:{
    
  }
}
</script>
<style lang="scss" scoped>
  .prod-list{
    li{
      background:$white;padding:0.36rem;color:#3c3c3c;
      .header{
        border-bottom:$border;padding-bottom:0.16rem;margin-bottom:0.16rem;
        h2{
          font-size:$f16;font-weight:normal;
        }
        h4{
          font-size:$f14;color:$font-sec;font-weight:normal;
        }
        strong{font-weight:inherit;}
        em{font-style:normal;color:$primary;}
      }
      .list{
        img{width:1rem;height:1rem;}
        dd{font-size:$f14;font-weight:normal;}
      }
      .amount{
        span{display:inline-block;font-size:$f14;}
        em{font-style:normal;padding-left:0.16rem;font-size:$f14;}
        strong{font-weight:normal;font-size:$f16;}
      }
    }
  }
</style>
