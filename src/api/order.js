import list from './data/order'

export const getOrderList = () => list
export const getOrderPendingPayList = () => {
  return list.filter(item => {
    return item.status == 2
  })
}
export const getOrderPendingReceiveList = () => {
  return list.filter(item => {
    return item.status == 3
  })
}
export const getOrderDetail = (id) => {
  return list.filter(item => {
    return item.orderNo == id
  })[0]
}