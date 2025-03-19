import { createStore } from "vuex";

export default createStore({
  state: {
    staff: null,
  },
  mutations: {
    setStaff(state, staff) {
      state.staff = staff;
    },
    clearStaff(state) {
      state.staff = null;
    },
  },
  actions: {
    setStaff({ commit }, staff) {
      commit("setStaff", staff);
    },
    clearStaff({ commit }) {
      commit("clearStaff");
    },
  },
  getters: {
    staff(state) {
      return state.staff;
    },
  },
});
