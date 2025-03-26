<template>
  <div id="app">
    <WaitlistHeader @logout-submitted="handleLogout" />
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import WaitlistHeader from "./components/WaitlistHeader.vue";
import axios from "axios";

export default {
  components: { WaitlistHeader },
  setup() {
    const store = useStore();
    const router = useRouter();

    const staff = computed(() => store.state.staff);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const handleLogout = async () => {
      try {
        console.log("Logging out...");
        await axios.post(
          `${process.env.VUE_APP_API_URL}/api/auth/logout`,
          {},
          { withCredentials: true }
        );

        store.dispatch("clearStore");

        alert("Logout successful!");
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
      }
    };

    const checkLoginStatus = async () => {
      try {
        console.log("Checking auth status...");
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/auth/status`,
          { withCredentials: true }
        );

        if (response.data.isLoggedIn) {
          store.dispatch("setStaff", response.data.staff);
          store.dispatch("setRestaurant", response.data.restaurant);
        }

        if (!store.getters.isLoggedIn) {
          store.dispatch("clearStore");
          router.push("/");
        }
      } catch (error) {
        console.error("Check login status error:", error);
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
        } else {
          alert(
            "An error occurred while checking your login status. Please try again later."
          );
        }
        store.dispatch("clearStore");
        router.push("/");
      }
    };

    onMounted(() => {
      if (!isLoggedIn.value) {
        checkLoginStatus();
      }
    });

    return {
      staff,
      handleLogout,
      checkLoginStatus,
    };
  },
};
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #d7d7d7;
  display: flex;
  flex-direction: column;
  color: #d7d7d7;
  background: #121212;
  min-height: 100vh;
}

/* .app {
  display: flex;
  flex-direction: column;
  color: #d7d7d7;
  background: #121212;
  min-height: 100vh;
} */
</style>
