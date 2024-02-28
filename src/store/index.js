import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeekStart: new Date(),
    reservations: [],
  },
  getters: {
    getCurrentWeekStart: (state) => state.currentWeekStart,
    getReservations: (state) => state.reservations,
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
    updateReservations: ({ commit }, reservations) => {
      commit('setReservations', reservations);
    },
  },
  modules: {
  },
});
