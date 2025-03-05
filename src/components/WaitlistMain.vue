<template>
  <main class="main">
    <section class="main">
      <div class="main-content">
        <h2 class="main-title">Join Our Waitlist</h2>
        <p class="main-description">
          We're currently at capacity. Add your name to our waitlist and we'll
          notify you when a table becomes available.
        </p>
        <button class="join-waitlist-button" @click="handleJoinWaitlist">
          Join Waitlist
        </button>
        <div class="wait-info">
          <p>Current estimated wait time: {{ totalWaitTime }} minutes</p>
          <p>We'll send you a text message when your table is almost ready.</p>
        </div>
      </div>
    </section>

    <section class="steps">
      <h3 class="steps-title">How It Works</h3>
      <div class="steps-grid">
        <div v-for="(step, index) in steps" :key="index" class="step-card">
          <div class="step-number">{{ index + 1 }}</div>
          <h4 class="step-title">{{ step.title }}</h4>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <CurrentParties view="guests" />
  </main>
</template>

<script>
import axios from "axios";
import CurrentParties from "./CurrentParties.vue";

export default {
  name: "WaitlistMain",
  components: {
    CurrentParties,
  },
  data() {
    return {
      waitlist: [],
      steps: [
        {
          title: "Join the Waitlist",
          description:
            "Click the button above to add your name and party size to our digital waitlist.",
        },
        {
          title: "Get Notified",
          description:
            "We will send you a text message when your table is ready.",
        },
        {
          title: "Get Seated",
          description:
            "When your table is ready, you'll receive a final notification to come inside and be seated.",
        },
      ],
    };
  },
  computed: {
    totalWaitTime() {
      return this.waitlist.length * (20 / 2);
      // (# of parties on waitlist) * (average meal time for their party size) / (table turnover rate)
      // in the future, we could add a more complex algorithm to calculate the party wait time
    },
  },
  methods: {
    handleJoinWaitlist() {
      this.$router.push("/join-waitlist");
    },
    async getGuests() {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/guests`
        );
        console.log(res.data);
        this.waitlist = res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getGuests();
  },
};
</script>

<style>
/* Main Section */
.main {
  flex: 1;
  padding: 4rem 1rem;
  text-align: center;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.main-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.join-waitlist-button {
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

.join-waitlist-button:hover {
  background-color: #b91c1c;
}

.wait-info {
  margin-top: 2rem;
}

/* Steps section */
.steps {
  background-color: #242424;
  padding: 4rem 1rem;
}

.steps-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.steps-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  padding: 0 1rem;
}

.step-card {
  background: #121212;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #dc2626;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
