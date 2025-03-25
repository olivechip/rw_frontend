<template>
  <div id="app">
    <WaitlistHeader @handleLogout="handleLogout" />
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import WaitlistHeader from "./components/WaitlistHeader.vue";
import axios from "axios";

export default {
  components: { WaitlistHeader },
  setup() {
    const store = useStore();
    const router = useRouter();
    const staff = computed(() => store.state.staff || { restaurant: {} });

    const handleLogout = async () => {
      try {
        console.log("Logging out...");
        await axios.post(
          `${process.env.VUE_APP_API_URL}/api/auth/logout`,
          {},
          { withCredentials: true }
        );
        store.dispatch("clearStaff");

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
        console.log(response.data);
        if (response.data.isLoggedIn) {
          store.dispatch("setStaff", response.data);
          console.log("Logged in as:", store.state.staff);
        } else {
          console.log("No staff is logged in");
          store.dispatch("clearStaff");
        }
      } catch (error) {
        console.error("Check login status error:", error);
        store.dispatch("clearStaff");
      }
    };

    onMounted(() => {
      if (!staff.value) {
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
