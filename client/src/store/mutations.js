import { types } from "./mutation-types";

const mutations = {
  [types.SET_CATEGORIES]: (state, { payload }) => {
    state.categories = payload.filter(item => item.status.name === "Activo");
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
    state.products = state.productsAll.filter(products => {
      return (
        state.selectedCategory === null
        ||
        products.category_id === state.selectedCategory.id
      );
    });
  },
  [types.SET_CATEGORY_ID]: (state, payload) => {
    state.selectedCategory = payload;
    state.products = state.productsAll.filter(products => {
      return (
        state.selectedCategory === null
        ||
        products.category_id === state.selectedCategory.id
      );
    });
  },
  [types.SEND_ITEM_TO_BASKET]: state => {
    state.basket.push(state.product)
    state.totalBasket = state.basket.reduce((total, product) => { return total + parseFloat(product.price) }, 0)
    state.itemSet = false;
    state.product = null;
  },
  [types.REMOVE_ITEM_FROM_BASKET]: state => {
    const index = state.basket.indexOf(state.product);
    state.basket.splice(index, 1);
    state.totalBasket = state.basket.reduce((total, product) => { return total + parseFloat(product.price) }, 0)
    state.itemSet = false;
    state.product = null;
  },
  [types.SET_ITEM_FOR_VIEW]: (state, payload) => {
    state.product = payload;
    state.itemSet = true;
  },
  [types.UNSET_ITEM_FROM_VIEW]: state => {
    state.product = null;
    state.itemSet = false;
  },
  [types.SET_UPDATES]: (state, { payload }) => {
    state.config = payload;
  }
};

export default mutations;
