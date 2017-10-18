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
  ADD_ITEM,
  SEND_ITEM_TO_BASKET,
  REMOVE_ITEM,
  REMOVE_ITEM_FROM_BASKET,
  SET_ITEM,
  SET_ITEM_FOR_VIEW,
  UNSET_ITEM,
  UNSET_ITEM_FROM_VIEW
} from '../store/mutation-types';

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
    [LOAD_CATEGORIES]: ({
      commit
    }) => {
      HTTP.get('categories').then((res) => {
        commit('SET_CATEGORIES', {
          payload: res.data.rows
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
          payload: res.data.rows
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
    [ADD_ITEM]: ({
      commit
    }, payload) => {
      commit('SEND_ITEM_TO_BASKET');
    },
    [REMOVE_ITEM]: ({
      commit
    }) => {
      commit('REMOVE_ITEM_FROM_BASKET');
    },
    [SET_ITEM]: ({
      commit
    }, payload) => {
      commit('SET_ITEM_FOR_VIEW', payload);
    },
    [UNSET_ITEM]: ({
      commit
    }) => {
      commit('UNSET_ITEM_FROM_VIEW');
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
    [SEND_ITEM_TO_BASKET]: (state) => {
      state.basket.push(state.product)
      state.totalBasket = parseFloat(state.totalBasket) + parseFloat(state.product.price);
      state.itemSet = false
      state.product = {}
    },
    [REMOVE_ITEM_FROM_BASKET]: (state) => {
      const index = state.basket.indexOf(state.product);
      state.totalBasket = parseFloat(state.totalBasket) - parseFloat(state.product.price);
      state.basket.splice(index, 1);
      state.itemSet = false
      state.product = {}
    },
    [SET_ITEM_FOR_VIEW]: (state,
      payload
    ) => {
      state.product = payload
      state.itemSet = true
      console.log(payload)
    },
    [UNSET_ITEM_FROM_VIEW]: (state) => {
      state.product = {}
      state.itemSet = false
    }
  }
});
