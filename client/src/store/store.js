import Vue from 'vue';
import Vuex from 'vuex';
import {
  LOAD_CATEGORIES,
  SET_CATEGORIES,
  LOAD_PRODUCTS,
  SET_PRODUCTS,
  LOAD_BASKET,
  SET_BASKET
} from '../store/mutation-types';
import HTTP from '../components/http-common';

Vue.use(Vuex);

const state = {
  categories: [],
  products: [],
  basket: [],
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
      state.products = payload
    },
    [SET_BASKET]: (state, {
      payload
    }) => {
      state.basket = payload
    }
  }
});
