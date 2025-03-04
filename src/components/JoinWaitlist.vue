<template>
  <div>
    <WaitlistHeader />
    <section class="join-waitlist">
      <div class="container">
        <h2 class="section-title"></h2>

        <div class="form-container">
          <form @submit.prevent="handleSubmit" class="waitlist-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                v-model="name"
                maxlength="30"
                required
              />
            </div>

            <div class="form-group">
              <label for="partySize">Party Size</label>
              <input
                type="number"
                id="partySize"
                v-model="partySize"
                min="1"
                max="8"
                @input="validatePartySize"
                required
              />
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                v-model="phoneNumber"
                maxlength="20"
                @input="validatePhoneNumber"
                required
              />
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-button">
                <span>Join Waitlist</span>
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
import WaitlistHeader from "./WaitlistHeader.vue";
import WaitlistFooter from "./WaitlistFooter.vue";
import axios from "axios";

export default {
  name: "JoinWaitlist",
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

      if (!/^\d+$/.test(value)) {
        input.setCustomValidity("Phone number must contain only numbers.");
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
.join-waitlist {
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

.waitlist-form {
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

/* Responsive adjustments */
@media (min-width: 768px) {
  .waitlist-form {
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
