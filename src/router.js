import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const Home              = () => import('@/pages/Home')
const Trolley           = () => import('@/pages/Trolley')
const My                = () => import('@/pages/My')
const Order             = () => import('@/pages/Order/Order')
const OrderAll          = () => import('@/pages/Order/Children/OrderAll')
const PendingPay        = () => import('@/pages/Order/Children/PendingPay')
const PendingReceive    = () => import('@/pages/Order/Children/PendingReceive')
const ProductDetail     = () => import('@/pages/ProductDetail')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path : '/',
      redirect : 'home',
    },
    {
      path : '/home',
      name : 'Home',
      component : Home,
      meta : {
        title: '首页',
        keepalive:['ProductDetail'],
      },
    },
    {
      path : '/trolley',
      name : 'Trolley',
      component : Trolley,
      meta : {
        title: '购物车',
        headerNav:{
          isShow:true,
        },
      },
    },
    {
      path : '/order',
      name : 'Order',
      component : Order,
      redirect : {
        name:'OrderAll'
      },
      meta : {
        title: '我的订单',
        keepalive:['ProductDetail'],
        headerNav:{
          isShow:true,
        },
        btmNav:{
          isShow:true,
          showName:"My",
        }
      },
      children : [
        {
          path     : 'all',
          name     : 'OrderAll',
          component: OrderAll,
          meta     : {
            title: '我的订单',
            keepalive:['ProductDetail'],
            headerNav:{
              isShow:true,
            },
            btmNav:{
              isShow:true,
              showName:"My",
            }
          },
        },
        {
          path     : 'pendingPay',
          name     : 'PendingPay',
          component: PendingPay,
          meta     : {
            title: '待支付订单',
            keepalive:['ProductDetail'],
            headerNav:{
              isShow:true,
            },
            btmNav:{
              isShow:true,
              showName:"My",
            },
          },
        },
        {
          path     : 'pendingReceive',
          name     : 'PendingReceive',
          component: PendingReceive,
          meta     : {
            title: '待收货订单',
            keepalive:['ProductDetail'],
            headerNav:{
              isShow:true,
            },
            btmNav:{
              isShow:true,
              showName:"My",
            },
          },
        },
        
      ],
    },
    {
      path : '/productDetail/:id',
      name : 'ProductDetail',
      component : ProductDetail,
      meta : {
        title: '订单详情',
      },
    },
    {
      path : '/my',
      name : 'My',
      component : My,
      meta : {
        title: '我的',
        keepalive:['Order','OrderAll','PendingPay','PendingReceive']
      },
    },
    {
      path: "*",
      redirect: "/"
    },
  ]
})

const isNeedDelFromIncludes = (to, from) => {
  if(!from.meta.keepalive) return true
  if(from.meta.keepalive.includes(to.name)){
    return false
  }
  return true
}

const isNeedAddFromIncludes = (to, from) => {
  if(!from.meta.keepalive) return false
  if(from.meta.keepalive.includes(to.name)){
    return true
  }
  return false
}

const isNeedDelToIncludes = (to, from) => {
  if(!to.meta.keepalive) return true
  if(to.meta.keepalive.includes(from.name)){
    return false
  }
  return true
}

router.beforeEach((to, from, next) =>{
  store.commit('addInclude', to.name)

  if(isNeedDelFromIncludes(to, from)){
    store.commit('delInclude', from.name)
    store.commit('delPosition', {path:from.path})
  }
  if(isNeedDelToIncludes(to,from)){
    to.matched.forEach(item =>{
      store.commit('delInclude', item.name)
    })
    store.commit('delPosition', {path:to.path})
  }
  if(isNeedAddFromIncludes(to,from)){
    let path = from.path
    let $main = document.querySelector(".main")
    let scrollTop = $main.scrollTop
    from.matched.forEach(item =>{
      store.commit('addInclude', item.name)
    })
    store.commit('setPosition', {path,scrollTop})
  }
  store.commit('setHeaderNav',to)
  store.commit('setBottomNav',to)

  next()
})

export default router