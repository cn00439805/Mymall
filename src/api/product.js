import list from './data/product'
import swiper from './data/swiper'

export const getProductList = () => list
export const getProductDetail = (id) => {
  return list.filter(item => {
    return item.pid == id
  })[0]
}

export const getSwiperList = () => swiper