<template>
  <div id="app" class="rela-layer">
    <div class="abs-layer">
      <div class="container" >
        <div class="main" :class="getClass">
          <keep-alive :include="include">
            <router-view />
          </keep-alive>
        </div>
        <transition name="fadeTop">
          <header-nav :title="$route.meta.title" v-if="isHeaderShow"></header-nav>
        </transition>
        <transition name="fadeBottom">
          <bottom-nav v-if="isBottomShow"></bottom-nav>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import bottomNav from 'components/bottom-nav.vue'
import headerNav from 'components/header-nav.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data(){
    return {

    }
  },
  computed:{
    getClass(){
      return {
        "has-header":this.isHeaderShow,
        "has-bottom":this.isBottomShow,
      }
    },
    ...mapState({
      isHeaderShow: state => state.headerNav.isShow,
      isBottomShow: state => state.bottomNav.isShow,
      include: state => state.pages.keepalive.include,
    }),
  },
  components:{
    headerNav,
    bottomNav,
  }
}
</script>

<style lang="scss" scoped>
  #app{-webkit-font-smoothing:antialiased;font-family:Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;}
  .rela-layer{display: block;position: relative;top: 0;left: 0;width: 100%;height: 100%;}
  .abs-layer{transform: translate3d(0px, 0px, 0px);height: 100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;}
  .container{max-width:$max-width;margin:0 auto;position: relative;z-index:3;height: 100%;}
  .main{margin:0 auto;overflow:auto;height:100%;-webkit-overflow-scrolling: touch;}
  .has-header{padding-top:1rem;}
  .has-bottom{padding-bottom:1.02rem;}
  .fadeTop-enter, .fadeTop-leave-to{ transform:translateY(-100%);}
  .fadeTop-enter-active, .fadeTop-leave-active{transition:transform .2s;}
  .fadeBottom-enter, .fadeBottom-leave-to{transform:translateY(100%);}
  .fadeBottom-enter-active, .fadeBottom-leave-active{transition:transform .3s;}
</style>
