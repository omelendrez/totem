const getters = {
  status: state => state.status,
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
  orderTurns: state => state.orderTurns,
  orderData: state => state.orderData,
  printingOrder: state => state.printingOrder
}

export default getters
