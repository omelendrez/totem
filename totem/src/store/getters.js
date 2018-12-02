const getters = {
  status: state => state.status,
  products: state => state.products,
  categories: state => state.categories,
  basket: state => state.basket,
  product: state => state.product,
  selectedCategory: state => state.selectedCategory,
  order: state => state.order,
  orders: state => state.orders,
  items: state => state.items,
  orderItems: state => state.orderItems,
  orderTurns: state => state.orderTurns
};

export default getters;
