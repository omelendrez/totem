const getters = {
  status: state => state.status,
  totem: state => state.totem,
  apiError: state => state.apiError,
  products: state => state.products,
  categories: state => state.categories,
  basket: state => state.basket,
  product: state => state.product,
  selectedCategory: state => state.selectedCategory,
  order: state => state.order,
  orders: state => state.orders,
  items: state => state.items,
  orderItems: state => state.orderItems,
  orderData: state => state.orderData,
  testOrderData: state => state.testOrderData,
  printingOrder: state => state.printingOrder,
  changedOrder: state => state.changedOrder,
  printedOrder: state => state.printedOrder,
  ccStatus: state => state.ccStatus,
  ccOrder: state => state.ccOrder,
  ccOrderData: state => state.ccOrderData,
  ccError: state => state.ccError,
  ccResponse: state => state.ccResponse
}

export default getters
