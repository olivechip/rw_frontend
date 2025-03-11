<template>
  <div>
    <WaitlistHeader />
    <section class="account-register">
      <div class="container">
        <h2 class="section-title">Restaurant Registration</h2>

        <div class="form-container">
          <form @submit.prevent="handleSubmit" class="register-form">
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
              <input type="text" id="address" v-model="address" required />
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
              <input type="text" id="cuisineType" v-model="cuisineType" />
            </div>

            <div class="form-group">
              <label for="website">Website</label>
              <input type="url" id="website" v-model="website" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" v-model="description"></textarea>
            </div>

            <div class="form-group">
              <label for="hoursOfOperation">Hours of Operation</label>
              <textarea
                id="hoursOfOperation"
                v-model="hoursOfOperation"
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-button">
                <span>Submit Restaurant</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <WaitlistFooter />
  </div>
</template>

<script>
import axios from "axios";
import WaitlistHeader from "./WaitlistHeader.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "AccountRegister",
  components: {
    WaitlistHeader,
    WaitlistFooter,
  },
  data() {
    return {
      name: "",
      partySize: 1,
      phoneNumber: "",
    };
  },
  methods: {
    validatePartySize(event) {
      const input = event.target;
      const value = input.value;

      if (value < 1 || value > 8) {
        input.setCustomValidity("Party size must be between 1 and 8.");
      } else {
        input.setCustomValidity("");
      }
    },
    validatePhoneNumber(event) {
      const input = event.target;
      const value = input.value;

      if (!/^\d+$/.test(value) || value.length !== 10) {
        input.setCustomValidity("Please enter a valid 10-digit phone number.");
      } else {
        input.setCustomValidity("");
      }
    },
    async handleSubmit() {
      try {
        // AWS RDS: send a POST request to the server
        await axios.post(`${process.env.VUE_APP_API_URL}/api/waitlist/create`, {
          name: this.name,
          partySize: this.partySize,
          phoneNumber: this.phoneNumber,
        });

        // LOCAL: emit an event with the new waitlist entry data
        // console.log(this.name, this.partySize, this.phoneNumber);
        // this.$emit("add-waitlist-entry", {
        //   name: this.name,
        //   partySize: this.partySize,
        //   waitTime: 10,
        //   status: "Waiting",
        // });

        alert("You have been added to the waitlist!");
        this.$router.push("/");
      } catch (error) {
        alert("Error joining waitlist. Please try again later.");
      }
    },
  },
};
</script>

<style>
/* Join Waitlist Section */
.account-register {
  background-color: #242424;
  padding: 4rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
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
