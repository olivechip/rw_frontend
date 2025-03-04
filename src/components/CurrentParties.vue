<template>
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
              <th>Phone Number</th>
              <th>Time Joined</th>
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
              <td>{{ party.phoneNumber }}</td>
              <td>
                {{ convertToLocalTime(party.waitlistEntry.joinTime) }}
              </td>
              <td>
                <span
                  :class="`status-badge ${party.waitlistEntry.status.toLowerCase()}`"
                >
                  {{ party.waitlistEntry.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CurrentParties",
  data() {
    return {
      waitlist: [],
    };
  },
  computed: {},
  methods: {
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
    convertToLocalTime(utcTime) {
      return (
        new Date(utcTime + "Z").toLocaleDateString() +
        " " +
        new Date(utcTime + "Z").toLocaleTimeString()
      );
    },
  },
  mounted() {
    this.getGuests();
  },
};
</script>

<style>
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
</style>
