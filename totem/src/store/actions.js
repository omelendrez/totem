import { getCategories, getProducts } from "@/services";

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
          item.image = image ? `http://localhost:3000/${image}` : "";
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
          item.image = image ? `http://localhost:3000/${image}` : "";
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
  }
};

export default actions;
