import { createStore } from "vuex";

export default createStore({
  state: {
    staff: null,
  },
  mutations: {
    SET_STAFF(state, staff) {
      state.staff = staff;
    },
    CLEAR_STAFF(state) {
      state.staff = null;
    },
  },
  actions: {
    setStaff({ commit }, staff) {
      commit("SET_STAFF", staff);
    },
    clearStaff({ commit }) {
      commit("CLEAR_STAFF");
    },
  },
  getters: {
    staff: (state) => state.staff,
    isLoggedIn: (state) => !!state.staff,
    restaurantId: (state) => state.staff?.restaurantId,
  },
});