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
  remove_item(state, { index }) {
    let basket = state.basket;
    if (index === -1) {
      basket = [];
    } else {
      basket.splice(index, 1);
    }
    state.basket = basket;
  },
  select_category(state, { item }) {
    state.selectedCategory = item;
  },
  save_order_request(state) {
    state.status = "loading";
    state.order = null;
  },
  save_order_success(state, { order }) {
    state.status = "success";
    state.order = order;
    state.basket = [];
  },
  load_orders_request(state) {},
  load_orders_success(state, { orders }) {
    state.status = "success";
    state.orders = orders;
  },
  load_items_request(state) {},
  load_items_success(state, { items }) {
    state.status = "success";
    state.items = items;
  },
  load_order_items_request(state) {},
  load_order_items_success(state, { orderItems }) {
    state.status = "success";
    state.orderItems = orderItems;
  },
  load_order_turns_request(state) {},
  load_order_turns_success(state, { orderTurns }) {
    state.status = "success";
    state.orderTurns = orderTurns;
  }
};

export default mutations;
