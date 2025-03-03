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
          <p>We'll send you a text message when your table is ready.</p>
        </div>
      </div>
    </section>

    <section class="current-parties">
      <div class="container">
        <h3 class="parties-title">Current Parties ({{ waitlist.length }})</h3>
        <div class="parties-table-container">
          <table class="parties-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Party Size</th>
                <th>Wait Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(party, index) in waitlist"
                :key="index"
                :class="{ highlighted: party.name === 'You' }"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ party.name }}</td>
                <td>{{ party.partySize }}</td>
                <td>{{ party.waitTime }} min</td>
                <td>
                  <span :class="`status-badge ${party.status.toLowerCase()}`">
                    {{ party.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
  </main>
</template>

<script>
export default {
  name: "WaitlistMain",
  data() {
    return {
      waitlist: [
        // mock parties for testing
        { name: "Oliver", partySize: 2, waitTime: 5, status: "Notified" },
        {
          name: "Tantalus Theater Troupe",
          partySize: 6,
          waitTime: 15,
          status: "Waiting",
        },
        { name: "Noctis", partySize: 4, waitTime: 20, status: "Waiting" },
        { name: "Avalanche", partySize: 6, waitTime: 25, status: "Waiting" },
      ],
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
      const totalWaitTime = this.waitlist.reduce(
        (acc, party) => acc + party.waitTime,
        0
      );
      return Math.round(totalWaitTime / this.waitlist.length);
      // in the future, we could add a more complex algorithm to calculate the total wait time
    },
  },
  methods: {
    handleJoinWaitlist() {
      alert(
        "Joining waitlist... This would open a form in a real application."
      );
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style>
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

/* Current Parties section */
.current-parties {
  background-color: #1a1a1a;
  padding: 4rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.parties-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.parties-table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.parties-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #121212;
}

.parties-table th,
.parties-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #333;
}

.parties-table th {
  background-color: #242424;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #a3a3a3;
}

.parties-table tr:last-child td {
  border-bottom: none;
}

/* if highlight for current viewer is needed
.parties-table tr.highlighted {
  background-color: rgba(220, 38, 38, 0.1);
} */

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
}

.status-badge.waiting {
  background-color: #58580e;
  color: #f1f50b;
}

.status-badge.notified {
  background-color: #064e3b;
  color: #10b981;
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
