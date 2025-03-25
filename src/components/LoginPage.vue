<template>
  <div>
    <LoginForm @login-submitted="handleLogin" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import LoginForm from "./LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleLogin = async (loginData) => {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/auth/login`,
          loginData
        );
        console.log(response);
        store.dispatch("setStaff", response.data);

        alert("Login successful!");
        router.push("/app");
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      }
    };

    return {
      handleLogin,
    };
  },
};
</script>