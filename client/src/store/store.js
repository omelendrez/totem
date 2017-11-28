import Vue from "vue";
import Vuex from "vuex";
import Category from "./../services/category";
import Product from "./../services/product";

import * as types from "../store/mutation-types";

Vue.use(Vuex);

const state = {
  categories: [],
  products: [],
  productsAll: [],
  basket: [],
  product: {},
  selectedCategoryId: null,
  itemSet: false,
  totalBasket: 0
};

export default new Vuex.Store({
  state,
  actions: {
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
  },
  mutations: {
    [types.SET_CATEGORIES]: (state, { payload }) => {
      state.categories = payload;
    },
    [types.SET_PRODUCTS]: (state, { payload }) => {
      const products = payload.map(product => {
        return (product.image =
          product.image !== "" ? product.image : product.category.image);
      });
      state.productsAll = payload;
      state.products = payload;
    },
    [types.SET_CATEGORY_ID]: (state, payload) => {
      state.selectedCategoryId = payload;
      state.products = state.productsAll.filter(products => {
        return (
          products.category_id === state.selectedCategoryId ||
          state.selectedCategoryId === null
        );
      });
    },
    [types.SEND_ITEM_TO_BASKET]: state => {
      state.basket.push(state.product);
      state.totalBasket =
        parseFloat(state.totalBasket) + parseFloat(state.product.price);
      state.itemSet = false;
      state.product = {};
    },
    [types.REMOVE_ITEM_FROM_BASKET]: state => {
      const index = state.basket.indexOf(state.product);
      state.totalBasket =
        parseFloat(state.totalBasket) - parseFloat(state.product.price);
      state.basket.splice(index, 1);
      state.itemSet = false;
      state.product = {};
    },
    [types.SET_ITEM_FOR_VIEW]: (state, payload) => {
      state.product = payload;
      state.itemSet = true;
    },
    [types.UNSET_ITEM_FROM_VIEW]: state => {
      state.product = {};
      state.itemSet = false;
    }
  }
});
