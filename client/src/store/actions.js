import Category from "@/services/category";
import Product from "@/services/product";
import Config from "@/services/config";
import { types } from "./mutation-types";

const actions = {
  async [types.LOAD_CATEGORIES]({ commit }) {
    const category = await Category.fetchCategories();
    commit(types.SET_CATEGORIES, {
      payload: category.data.rows
    });
  },
  async [types.LOAD_PRODUCTS]({ commit }) {
    const product = await Product.fetchProducts();
    commit(types.SET_PRODUCTS, {
      payload: product.data.rows
    });
  },
  async [types.CHECK_UPDATES]({ commit }) {
    const config = await Config.checkUpdates();
    commit(types.SET_UPDATES, {
      payload: config.data
    });
  },
  async [types.SEND_AKNOWLEDGE]({ commit }) {
    const config = await Config.sendAknowledge();
  },
  [types.FILTER_BY_CATEGORY]: ({ commit }, payload) => {
    commit(types.SET_CATEGORY_ID, payload);
  },
  [types.RESET_VIEW]: ({ commit }) => {
    commit(types.SET_CATEGORY_ID, null);
  },
  [types.ADD_ITEM]: ({ commit }, payload) => {
    commit(types.SEND_ITEM_TO_BASKET);
  },
  [types.REMOVE_ITEM]: ({ commit }) => {
    commit(types.REMOVE_ITEM_FROM_BASKET);
  },
  [types.SET_ITEM]: ({ commit }, payload) => {
    commit(types.SET_ITEM_FOR_VIEW, payload);
  },
  [types.UNSET_ITEM]: ({ commit }) => {
    commit(types.UNSET_ITEM_FROM_VIEW);
  }
};

export default actions;
