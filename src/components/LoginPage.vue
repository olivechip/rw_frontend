<template>
  <div>
    <LoginForm @login-submitted="handleLoginSubmit" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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

    const handleLoginSubmit = async (loginData) => {
      try {
        await performLogin(loginData, store, router);
      } catch (error) {
        throw new Error("Login failed. Please try again.");
      }
    };

    return {
      handleLoginSubmit,
    };
  },
};
</script>
