<template>
  <img :data-src="dataSrc" :src="imgSrc" :lazy="lazy">
</template>

<script>
export default {
  name: 'lazyImage',
  data () {
    return {
      imgSrc:"",
      lazy:"",
    }
  },
  created(){
    this.loadLazyImage()
  },
  props:{
    dataSrc:{
      type:String,
      default:"",
    },
    src:{
      type:String,
      default:"",
    },
  },
  computed:{

  },
  methods: {
    loadLazyImage(){
      this.imgSrc = this.dataSrc
      let img = new Image()
      img.onload = () => {
        this.imgSrc = this.src
        this.lazy = "loaded"
      }
      img.src = this.src
    },
  },
 
}
</script>

<style lang="scss" scoped>
  img[lazy=loaded]{
    animation: opacity01 .3s;
  }

  @keyframes opacity01 {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
  }
</style>
