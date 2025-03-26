import axios from "axios";

export async function performLogin(loginData, store, router) {
  try {
    console.log("Logging in...");
    const loginResponse = await axios.post(
      `${process.env.VUE_APP_API_URL}/api/auth/login`,
      loginData
    );

    store.dispatch("setStaff", loginResponse.data.staff);
    store.dispatch("setRestaurant", loginResponse.data.restaurant);

    alert("Login successful!");
    router.push("/app");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
