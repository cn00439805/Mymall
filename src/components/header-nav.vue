<template>
  <div class="header-nav ui-flex justify-space-between align-center" v-if="isShow">
    <div class="header-nav-left">
      <a @click="goBack()" href="javascript:;" class="ui-flex align-center justify-center"><i class="iconfont icon-xiaoyuhao"></i></a>
    </div>
    <h2>{{title}}</h2>
    <div class="header-nav-right">
      <a href="javascript:;" class="ui-flex align-center justify-center"><i class="iconfont icon-sousuo"></i></a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderNav',
  data () {
    return {
    }
  },
  props:{
    title:{
      type:String,
      default:""
    }
  },
  computed:{
    ...mapState({
      isShow: state => state.headerNav.isShow,
    })
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
.header-nav {
  position: absolute;z-index:99;top:0;left:auto;right:auto;background:#f2f2f2;width: 100%;height: 1rem;color: #666;max-width:$max-width;h2{font-size:0.32rem;font-weight:normal;}
}
.icon-xiaoyuhao{font-size:0.44rem;}
.icon-sousuo{font-size:0.44rem;}
.header-nav-left, .header-nav-right{
  height:100%;
  a{
    width:1rem;height:100%;
    i{display:block;}
  }
}
</style>
