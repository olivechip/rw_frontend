<template>
  <section class="staff-register">
    <div class="container">
      <h2 class="form-title">Staff Registration</h2>
      <div class="form-container">
        <form @submit.prevent="handleStaffSubmit" class="register-form">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model="firstName" required />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model="lastName" required />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="role" required :disabled="isAdminProp">
              <option v-if="isAdminProp" value="admin">ADMIN</option>
              <template v-else>
                <option value="staff">WAITSTAFF</option>
                <option value="manager">MANAGER</option>
              </template>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-button">
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: this.isAdmin ? "admin" : "staff",
    };
  },
  computed: {
    isAdminProp() {
      return this.isAdmin;
    },
  },
  methods: {
    // sends staff form data to parent component
    handleStaffSubmit() {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        role: this.role,
      };
      this.$emit("staff-submitted", userData);
    },
  },
};
</script>

<style>
.staff-register {
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

.register-form {
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #242424;
  border: 1px solid #333;
  border-radius: 0.25rem;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #dc2626;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
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

/* Responsive adjustments */
@media (min-width: 768px) {
  .register-form {
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
