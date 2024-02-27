import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeekStart: new Date(),
  },
  getters: {
    getCurrentWeekStart: (state) => state.currentWeekStart,
  },
  mutations: {
    setCurrentWeekStart: (state, newDate) => {
      state.currentWeekStart = newDate;
    },
  },
  actions: {
    updateCurrentWeekStart: ({ commit }, newDate) => {
      commit('setCurrentWeekStart', newDate);
    },
  },
  modules: {
  },
});
