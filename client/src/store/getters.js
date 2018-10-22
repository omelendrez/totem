const getters = {
  categories: state => state.categories,
  products: state => state.products,
  productsAll: state => state.productsAll,
  basket: state => state.basket,
  product: state => state.product,
  selectedCategoryId: state => state.selectedCategoryId,
  itemSet: state => state.itemSet,
  totalBasket: state => state.totalBasket
}

export default getters
