<template>
  <section class="current-parties">
    <div class="container">
      <h3 class="parties-title" v-if="view === 'staff'">
        Total Parties ({{ filteredWaitlist.length }})
      </h3>
      <h3 class="parties-title" v-else>Current Waitlist</h3>
      <div class="parties-table-container">
        <table class="parties-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Party Size</th>
              <th v-if="view == 'staff'">Phone Number</th>
              <th>Time Joined</th>
              <th>Status</th>
              <th v-if="view === 'staff'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(party, index) in filteredWaitlist"
              :key="index"
              :class="{ highlighted: party.name === 'You' }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ party.name }}</td>
              <td>{{ party.partySize }}</td>
              <td v-if="view == 'staff'">{{ party.phoneNumber }}</td>
              <td>{{ convertToLocalTime(party.waitlistEntry.joinTime) }}</td>
              <td>
                <span
                  :class="`status-badge ${party.waitlistEntry.status.toLowerCase()}`"
                >
                  {{ party.waitlistEntry.status }}
                </span>
              </td>
              <td v-if="view === 'staff'">
                <template
                  v-if="
                    party.waitlistEntry.status === 'WAITING' ||
                    party.waitlistEntry.status === 'NOTIFIED'
                  "
                >
                  <button @click="nextStatus(party)">Next</button>
                  <button @click="cancelEntry(party)">Cancel</button>
                </template>
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
  props: {
    view: {
      type: String,
      default: "guests",
    },
  },
  data() {
    return {
      waitlist: [],
    };
  },
  computed: {
    filteredWaitlist() {
      return this.waitlist.filter((party) => {
        const status = party.waitlistEntry.status.toLowerCase();
        return (
          this.view === "staff" || status === "waiting" || status === "notified"
        );
      });
    },
  },
  methods: {
    async getGuests() {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/guests`
        );
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
    async nextStatus(party) {
      const currentStatus = party.waitlistEntry.status;
      const nextStatus = {
        WAITING: "NOTIFIED",
        NOTIFIED: "COMPLETED",
      };
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URL}/api/waitlist/${party.name}/${nextStatus[currentStatus]}`
        );
        party.waitlistEntry.status = nextStatus[currentStatus];
      } catch (error) {
        console.error(error);
      }
    },
    async cancelEntry(party) {
      if (
        confirm(
          `Are you sure you want to mark ${party.name}'s status as CANCELED?`
        )
      ) {
        try {
          await axios.put(
            `${process.env.VUE_APP_API_URL}/api/waitlist/${party.name}/CANCELED`
          );
          party.waitlistEntry.status = "CANCELED";
        } catch (error) {
          console.error(error);
        }
      }
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
  background-color: #a11c1c;
}

.status-badge.notified {
  background-color: #157026;
}

.status-badge.completed {
  background-color: #01517c;
  color: #d3d4ff;
}

.status-badge.canceled {
  background-color: #525252;
  color: #dfdfdf;
}
</style>
