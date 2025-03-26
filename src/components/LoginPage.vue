<template>
  <div>
    <LoginForm @login-submitted="handleLoginSubmit" :error="loginError" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LoginForm from "./LoginForm.vue";
import { performLogin } from "@/utils/authUtils";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginError = ref(null);

    const handleLoginSubmit = async (loginData) => {
      try {
        await performLogin(loginData, store, router);
        loginError.value = null;
      } catch (error) {
        loginError.value = "Invalid credentials. Please try again.";
      }
    };

    return {
      handleLoginSubmit,
      loginError,
    };
  },
};
</script>
