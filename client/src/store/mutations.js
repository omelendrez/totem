import { types } from "./mutation-types";
console.log('types', types)

const mutations = {
  [types.SET_CATEGORIES]: (state, { payload }) => {
    state.categories = payload;
  },
  [types.SET_PRODUCTS]: (state, { payload }) => {
    const products = payload.map(product => {
      return (product.image = product.image
        ? product.image
        : product.category.image);
    });
    state.productsAll = payload.filter(products => {
      return products.price > 0;
    });
    state.products = state.productsAll;
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
};

export default mutations;
