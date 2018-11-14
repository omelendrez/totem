const getters = {
  status: state => state.status,
  products: state => state.products,
  categories: state => state.categories,
  basket: state => state.basket,
  product: state => state.product,
  selectedCategory: state => state.selectedCategory
};

export default getters;
