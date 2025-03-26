import axios from "axios";

export async function performLogin(loginData, store, router) {
  try {
    const loginResponse = await axios.post(
      `${process.env.VUE_APP_API_URL}/api/auth/login`,
      loginData
    );

    store.dispatch("setStaff", loginResponse.data);

    const restaurantResponse = await axios.get(
      `${process.env.VUE_APP_API_URL}/api/restaurants/${loginResponse.data.restaurantId}`
    );

    store.dispatch("setRestaurant", restaurantResponse.data);

    router.push("/app");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
