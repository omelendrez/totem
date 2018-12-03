import {
  getCategories,
  getProducts,
  saveOrder,
  loadOrders,
  loadItems,
  loadOrderItems,
  loadOrderTurns
} from "@/services";
const { CONFIG } = require("@/config");
const host = CONFIG.url;

const handleError = err => {
  const error = {
    success: false,
    error: "There is a problem trying to connect to backend server"
  };
  return err.response && err.response.data ? err.response.data : error;
};

const getResults = resp => (resp.data.rows ? resp.data.rows : []);

const actions = {
  async loadCategories({ commit }) {
    commit("load_categories_request");
    getCategories()
      .then(resp => {
        const categories = getResults(resp);
        categories.map(item => {
          const image = item.image ? item.image : "";
          item.image = image ? `${host}${image}` : "";
          return item;
        });
        commit("load_categories_success", { rows: categories });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadProducts({ commit }) {
    commit("load_products_request");
    getProducts()
      .then(resp => {
        const products = getResults(resp);
        products.map(item => {
          const image = item.image || item.category.image || "";
          item.image = image ? `${host}${image}` : "";
          return item;
        });
        commit("load_products_success", { rows: products });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async add({ commit }, item) {
    commit("add_item", { item });
  },
  async info({ commit }, item) {
    commit("info", { item });
  },
  async remove({ commit }, index) {
    commit("remove_item", { index });
  },
  async selectCategory({ commit }, item) {
    commit("select_category", { item });
  },
  async saveOrder({ commit }, basket) {
    commit("save_order_request");
    saveOrder(basket)
      .then(resp => {
        commit("save_order_success", { order: resp.data });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadOrders({ commit }) {
    commit("load_orders_request");
    loadOrders()
      .then(resp => {
        commit("load_orders_success", { orders: resp.data });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadItems({ commit }) {
    commit("load_items_request");
    loadItems()
      .then(resp => {
        commit("load_items_success", { items: resp.data });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadOrderItems({ commit }) {
    commit("load_order_items_request");
    loadOrderItems()
      .then(resp => {
        commit("load_order_items_success", { orderItems: resp.data });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadOrderTurns({ commit }) {
    commit("load_order_turns_request");
    loadOrderTurns()
      .then(resp => {
        commit("load_order_turns_success", { orderTurns: resp.data });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  }
};

export default actions;
