const getters = {
  categories: state => state.categories,
  products: state => state.products,
  productsAll: state => state.productsAll,
  basket: state => state.basket,
  product: state => state.product,
  selectedCategory: state => state.selectedCategory,
  itemSet: state => state.itemSet,
  totalBasket: state => state.totalBasket,
  config: state => state.config
};

export default getters;
