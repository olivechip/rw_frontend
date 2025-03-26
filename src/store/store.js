import { createStore } from "vuex";

export default createStore({
  state: {
    staff: null,
    restaurant: null,
  },
  mutations: {
    SET_STAFF(state, staff) {
      state.staff = staff;
    },
    CLEAR_STAFF(state) {
      state.staff = null;
    },
    SET_RESTAURANT(state, restaurant) {
      state.restaurant = restaurant;
    },
    CLEAR_RESTAURANT(state) {
      state.restaurant = null;
    },
  },
  actions: {
    setStaff({ commit }, staff) {
      commit("SET_STAFF", staff);
    },
    clearStaff({ commit }) {
      commit("CLEAR_STAFF");
    },
    setRestaurant({ commit }, restaurant) {
      commit("SET_RESTAURANT", restaurant);
    },
    clearRestaurant({ commit }) {
      commit("CLEAR_RESTAURANT");
    },
  },
  getters: {
    staff: (state) => state.staff,
    isLoggedIn: (state) => !!state.staff,
    restaurantId: (state) => state.staff?.restaurantId,
    restaurant: (state) => state.restaurant,
  },
});
