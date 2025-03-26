<template>
  <section class="restaurant-register">
    <div class="container">
      <h2 class="form-title">Restaurant Registration</h2>
      <div class="form-container">
        <form @submit.prevent="handleRestaurantSubmit" class="register-form">
          <div class="form-group">
            <label for="name">Restaurant Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              maxlength="30"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input type="address" id="address" v-model="address" required />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="phoneNumber"
              minlength="10"
              maxlength="20"
              @input="validatePhoneNumber"
              required
            />
          </div>
          <div class="form-group">
            <label for="cuisineType">Cuisine Type</label>
            <input
              type="text"
              id="cuisineType"
              v-model="cuisineType"
              placeholder="Italian, Indian, Chinese, Mexican, Greek, etc"
              required
            />
          </div>
          <div class="form-group">
            <label for="website">Website (Optional)</label>
            <input type="url" id="website" v-model="website" />
          </div>
          <div class="form-group">
            <label for="description">Description (Optional)</label>
            <textarea
              id="description"
              v-model="description"
              placeholder="Authentic and delicious Chinese cuisine. Come taste the difference!"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="hoursOfOperation">Hours of Operation</label>
            <textarea
              id="hoursOfOperation"
              v-model="hoursOfOperation"
              placeholder="Mon-Thu: 11am - 10pm, Fri-Sat: 11am - 11pm, Sun: 11am - 9pm"
            ></textarea>
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
export default {
  data() {
    return {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      cuisineType: "",
      website: "",
      description: "",
      hoursOfOperation: "",
    };
  },
  methods: {
    validatePhoneNumber(event) {
      const input = event.target;
      const value = input.value;

      if (!/^\d+$/.test(value) || value.length < 10 || value.length > 20) {
        input.setCustomValidity("Please enter a valid phone number.");
      } else {
        input.setCustomValidity("");
      }
    },

    // sends restaurant form data to parent component
    handleRestaurantSubmit() {
      const restaurantData = {
        name: this.name,
        email: this.email,
        address: this.address,
        phoneNumber: this.phoneNumber,
        cuisineType: this.cuisineType,
        website: this.website,
        description: this.description,
        hoursOfOperation: this.hoursOfOperation,
      };
      this.$emit("restaurant-submitted", restaurantData);
    },
  },
};
</script>

<style scoped>
.restaurant-register {
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
