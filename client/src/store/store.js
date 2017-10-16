import Vue from 'vue';
import Vuex from 'vuex';
import HTTP from '../components/http-common';

import {
  LOAD_CATEGORIES,
  SET_CATEGORIES,
  LOAD_PRODUCTS,
  SET_PRODUCTS,
  FILTER_BY_CATEGORY,
  SET_CATEGORY_ID,
  RESET_VIEW,
  LOAD_BASKET,
  SET_BASKET
} from '../store/mutation-types';

Vue.use(Vuex);

const state = {
  categories: [],
  products: [],
  productsAll: [],
  basket: [],
  selectedCategoryId: null
};

export default new Vuex.Store({
  state,
  actions: {
    [LOAD_CATEGORIES]: ({
      commit
    }) => {
      HTTP.get('categories').then((res) => {
        commit('SET_CATEGORIES', {
          payload: res.data
        })
      }, (err) => {
        console.log(err)
      })
    },
    [LOAD_PRODUCTS]: ({
      commit
    }) => {
      HTTP.get('products').then((res) => {
        commit('SET_PRODUCTS', {
          payload: res.data
        })
      }, (err) => {
        console.log(err)
      })
    },
    [FILTER_BY_CATEGORY]: ({
      commit
    }, payload) => {
      commit('SET_CATEGORY_ID', payload);
    },
    [RESET_VIEW]: ({
      commit
    }) => {
      commit('SET_CATEGORY_ID', null);
    },
    [LOAD_BASKET]: ({
      commit
    }) => {
      HTTP.get('basket').then((res) => {
        commit('SET_BASKET', {
          payload: res.data
        })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    [SET_CATEGORIES]: (state, {
      payload
    }) => {
      state.categories = payload
    },
    [SET_PRODUCTS]: (state, {
      payload
    }) => {
      const products = payload.map((product) => {
        return product.image = product.image !== '' ? product.image : product.category.image
      });
      state.productsAll = payload;
      state.products = payload;
    },
    [SET_CATEGORY_ID]: (state,
      payload
    ) => {
      state.selectedCategoryId = payload;
      state.products = state.productsAll.filter((products) => {
        return products.category_id === state.selectedCategoryId || state.selectedCategoryId === null;
      });
    },
    [SET_BASKET]: (state, {
      payload
    }) => {
      state.basket = payload
    }
  }
});
