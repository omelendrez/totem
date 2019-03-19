const mutations = {
  start_request(state) {
    state.status = 'loading'
    state.apiError = null
  },
  request_error(state, error) {
    state.status = 'error'
    state.apiError = error
    state.printingOrder = ''
  },
  reset_error(state) {
    state.status = ''
    state.apiError = ''
    state.printingOrder = ''
  },
  load_categories_request(state) {
    state.status = 'loading'
    state.categories = []
  },
  load_categories_success(state, { rows }) {
    state.status = 'success'
    state.categories = rows
  },
  load_products_request(state) {
    state.status = 'loading'
    state.products = []
  },
  load_products_success(state, { rows }) {
    state.status = 'success'
    state.products = rows
  },
  load_basket_request(state) {
    state.status = 'loading'
    state.basket = []
  },
  add_item(state, { item }) {
    state.basket.push(item)
  },
  info(state, { item }) {
    state.product = item
  },
  remove_item(state, { index }) {
    let basket = state.basket
    if (index === -1) {
      basket = []
      state.ccStatus = 3
    } else {
      basket.splice(index, 1)
    }
    state.basket = basket
  },
  select_category(state, { item }) {
    state.selectedCategory = item
  },
  save_order_request(state) {
    state.status = 'loading'
    state.order = null
  },
  save_order_success(state, order) {
    state.status = 'success'
    state.order = order
    state.basket = []
    state.selectedCategory = null
  },
  load_orders_request(state) {},
  load_orders_success(state, { orders }) {
    state.status = 'success'
    state.orders = orders.map(item => {
      item.order_number_formatted = item.order_number.substring(
        item.order_number.length - 3,
        item.order_number.length
      )
      return item
    })
  },
  load_items_request(state) {},
  load_items_success(state, { items }) {
    state.status = 'success'
    state.items = items.map(item => {
      item.order_number_formatted = item.order.order_number.substring(
        item.order.order_number.length - 3,
        item.order.order_number.length
      )
      return item
    })
  },
  load_order_items_request(state) {},
  load_order_items_success(state, { orderItems }) {
    state.status = 'success'
    state.orderItems = orderItems.map(item => {
      item.order_number_formatted = item.order_number.substring(
        item.order_number.length - 3,
        item.order_number.length
      )
      return item
    })
  },
  load_order_data_request(state) {},
  load_order_data_success(state, { order }) {
    state.status = 'success'
    state.orderData = order
  },
  change_order_status_request(state) {},
  change_order_status_success(state, order) {
    state.changedOrder = order
  },
  change_item_status_request(state) {},
  change_item_status_success(state) {},
  reset_totem(state) {
    state.selectedCategory = null
    state.info = {}
    state.basket = []
    state.order = {}
    state.product = {}
  },
  print_order_data_request(state, order) {
    state.printingOrder = order.order_number
  },
  print_order_data_success(state, order) {
    state.printingOrder = ''
    state.printedOrder = order
  },
  load_totem_status_request(state) {},
  load_totem_status_success(state, totem) {
    state.totem = totem
  },
  set_cc_status(state, status) {
    state.ccStatus = status
  }
}

export default mutations
