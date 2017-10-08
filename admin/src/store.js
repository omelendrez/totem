import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function store() {
  return new Vuex.Store({
    state: {
      user: {
        id: 1,
        name: 'omar'
      }
    },
    getters: {
      logged(state) {
        return state.user;
      }
    },
    mutations: {
      activate(state, user) {
        state.user.push(user);
      }
    }
  });
}

export default store;
