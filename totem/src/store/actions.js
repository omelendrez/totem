import { getCategories, getProducts, getBasket } from "@/services";

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
        commit("load_categories_success", { rows: getResults(resp) });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadProducts({ commit }) {
    commit("load_products_request");
    getProducts()
      .then(resp => {
        commit("load_products_success", { rows: getResults(resp) });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  },
  async loadBasket({ commit }) {
    commit("load_basket_request");
    getBasket()
      .then(resp => {
        commit("load_basket_success", { rows: getResults(resp) });
      })
      .catch(err => {
        commit("request_error", handleError(err));
      });
  }
};

export default actions;
