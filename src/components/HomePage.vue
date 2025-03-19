<template>
  <div>
    <div class="main">
      <div class="main-content">
        <h2 class="main-title">
          Simplify Your Waitlists.<br />Maximize Your Efficiency.
        </h2>
        <p class="main-description">
          Our intuitive platform helps you streamline your queues, reduce wait
          times, and improve customer satisfaction.
        </p>
        <button class="register-button" @click="handleRegisterButton">
          Try It Out
        </button>
      </div>
      <div class="login-prompt">
        <p>Already have an account?</p>
        <router-link to="/login" class="login-link">Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  setup() {
    const router = useRouter();

    const handleRegisterButton = () => {
      router.push("/register");
    };

    return {
      handleRegisterButton,
    };
  },
};
</script>

<style scoped>
.main-description {
  padding: 2rem 4rem;
}

.register-button {
  background-color: #dc2626;
  color: #d7d7d7;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.125rem;
  font-weight: bold;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-button:hover {
  background-color: #b91c1c;
}

.login-prompt {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
}

.login-link {
  color: #0061ca; /* Example link color */
  text-decoration: none;
  margin-left: 0.5rem;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
