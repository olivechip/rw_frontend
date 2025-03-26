import { createStore } from "vuex";

export default createStore({
  state: {
    staff: null,
    restaurantData: null,
  },
  mutations: {
    SET_STAFF(state, staff) {
      state.staff = staff;
    },
    CLEAR_STAFF(state) {
      state.staff = null;
    },
    SET_RESTAURANT_DATA(state, data) {
      state.restaurantData = data;
    },
    CLEAR_RESTAURANT_DATA(state) {
      state.restaurantData = null;
    },
  },
  actions: {
    setStaff({ commit }, staff) {
      commit("SET_STAFF", staff);
    },
    clearStaff({ commit }) {
      commit("CLEAR_STAFF");
    },
    setRestaurantData({ commit }, data) {
      commit("SET_RESTAURANT_DATA", data);
    },
    clearRestaurantData({ commit }) {
      commit("CLEAR_RESTAURANT_DATA");
    },
  },
  getters: {
    staff: (state) => state.staff,
    isLoggedIn: (state) => !!state.staff,
    restaurantId: (state) => state.staff?.restaurantId,
    restaurantData: (state) => state.restaurantData,
  },
});
