<template>
  <section class="login">
    <div class="container">
      <h2 class="form-title">Staff Login</h2>
      <div class="form-container">
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              autocomplete="username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              autocomplete="current-password"
              required
            />
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-button">
              <span>Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginForm",
  props: {
    error: String,
  },
  setup(props, { emit }) {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref(null);

    const handleLogin = () => {
      const loginData = {
        username: username.value,
        password: password.value,
      };
      emit("login-submitted", loginData);
      username.value = "";
      password.value = "";
    };

    return {
      username,
      password,
      handleLogin,
      errorMessage,
    };
  },
  watch: {
    error(newError) {
      this.errorMessage = newError;
    },
    username() {
      if (this.error === null) {
        this.errorMessage = null;
      }
    },
    password() {
      if (this.error === null) {
        this.errorMessage = null;
      }
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #242424;
  padding: 4rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #121212;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
}

.login-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #a3a3a3;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #242424;
  border: 1px solid #333;
  border-radius: 0.25rem;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #dc2626;
}

.form-actions {
  margin-top: 2rem;
}

.submit-button {
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

.submit-button:hover {
  background-color: #b91c1c;
}

.error-message {
  color: #dc2626;
  text-align: center;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .login-form {
    padding: 2.5rem;
  }

  .form-actions {
    display: flex;
    justify-content: center;
  }

  .submit-button {
    width: auto;
    min-width: 200px;
  }
}
</style>
