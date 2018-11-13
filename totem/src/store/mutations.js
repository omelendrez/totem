const mutations = {
  start_request(state) {
    state.status = "loading";
    state.apiError = null;
  },
  request_error(state, error) {
    state.status = "error";
    state.apiError = error;
  },
  load_categories_request(state) {
    state.status = "loading";
    state.categories = [];
  },
  load_categories_success(state, { rows }) {
    state.status = "success";
    state.categories = rows;
  },
  load_products_request(state) {
    state.status = "loading";
    state.products = [];
  },
  load_products_success(state, { rows }) {
    state.status = "success";
    state.products = rows;
  },
  load_basket_request(state) {
    state.status = "loading";
    state.basket = [];
  },
  add_item(state, { item }) {
    state.basket.push(item);
  },
  info(state, { item }) {
    state.product = item;
  },
  remove_item(state, { item }) {
    const basket = state.basket;
    basket.splice(item, 1);
    state.basket = basket;
  },
  select_category(state, { item }) {
    state.selectedCategory = item;
  }
};

export default mutations;
