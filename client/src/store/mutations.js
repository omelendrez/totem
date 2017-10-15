export const mutations = {
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