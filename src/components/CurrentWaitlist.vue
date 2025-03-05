<template>
  <section class="current-parties">
    <div class="container">
      <h3 class="parties-title">
        <span class="title-text">
          {{
            view === "staff"
              ? `Total Parties (${filteredWaitlist.length})`
              : "Current Waitlist"
          }}
        </span>
        <RefreshButton @refresh="getGuests" />
        <p class="tiny-text">last updated: {{ lastUpdated }}</p>
      </h3>

      <div class="parties-table-container">
        <table class="parties-table">
          <thead>
            <tr>
              <th>
                Position<button
                  v-if="view === 'staff'"
                  class="sort-button"
                  @click="sortByPosition"
                >
                  Sort
                </button>
              </th>
              <th>Name</th>
              <th>Party Size</th>
              <th v-if="view == 'staff'">Phone Number</th>
              <th>
                Time Joined<button
                  v-if="view === 'staff'"
                  class="sort-button"
                  @click="sortByTimeJoined"
                >
                  Sort
                </button>
              </th>
              <th>Status</th>
              <th v-if="view === 'staff'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(party, index) in filteredWaitlist" :key="index">
              <td>
                {{
                  ["COMPLETED", "CANCELED"].includes(party.waitlistEntry.status)
                    ? "-"
                    : getVisiblePosition(index)
                }}
              </td>
              <td>{{ party.name }}</td>
              <td>{{ party.partySize }}</td>
              <td v-if="view === 'staff'">{{ party.phoneNumber }}</td>
              <td>{{ formatDateTime(party.waitlistEntry.joinTime) }}</td>
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
                    ['WAITING', 'NOTIFIED'].includes(party.waitlistEntry.status)
                  "
                >
                  <button @click="updateStatus(party)">Next</button>
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
import RefreshButton from "./RefreshButton.vue";

export default {
  name: "CurrentWaitlist",
  components: { RefreshButton },
  props: {
    view: { type: String, default: "guests" },
  },
  data() {
    return {
      waitlist: [],
      lastUpdated: new Date().toLocaleTimeString(),
      sortAscending: true,
      sortBy: null,
    };
  },
  computed: {
    filteredWaitlist() {
      const filtered = this.waitlist.filter(({ waitlistEntry }) =>
        this.view === "staff"
          ? true
          : ["waiting", "notified"].includes(waitlistEntry.status.toLowerCase())
      );

      return [...filtered].sort((a, b) => {
        if (this.sortBy === "position") {
          const positionA = ["CANCELED", "COMPLETED"].includes(
            a.waitlistEntry.status
          )
            ? Infinity
            : this.getVisiblePosition(filtered.indexOf(a));
          const positionB = ["CANCELED", "COMPLETED"].includes(
            b.waitlistEntry.status
          )
            ? Infinity
            : this.getVisiblePosition(filtered.indexOf(b));
          return this.sortAscending
            ? positionA - positionB
            : positionB - positionA;
        } else if (this.sortBy === "timeJoined") {
          const timeA = new Date(a.waitlistEntry.joinTime);
          const timeB = new Date(b.waitlistEntry.joinTime);
          return this.sortAscending ? timeA - timeB : timeB - timeA;
        } else {
          return 0;
        }
      });
    },
  },
  methods: {
    async getGuests() {
      try {
        const { data } = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/guests`
        );
        this.waitlist = data;
        this.lastUpdated = new Date().toLocaleTimeString();
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    },
    sortByPosition() {
      this.sortBy = "position";
      this.sortAscending = true;
    },
    sortByTimeJoined() {
      this.sortBy = "timeJoined";
      this.sortAscending = true;
    },
    getVisiblePosition(index) {
      let position = 1;
      for (let i = 0; i < index; i++) {
        if (
          !["COMPLETED", "CANCELED"].includes(
            this.filteredWaitlist[i].waitlistEntry.status
          )
        ) {
          position++;
        }
      }
      return position;
    },
    formatDateTime(utcTime) {
      const date = new Date(`${utcTime}Z`);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
    async updateStatus(party) {
      const nextStatusMap = { WAITING: "NOTIFIED", NOTIFIED: "COMPLETED" };
      const nextStatus = nextStatusMap[party.waitlistEntry.status];

      if (!nextStatus) return;

      try {
        await axios.put(
          `${process.env.VUE_APP_API_URL}/api/waitlist/${party.name}/${nextStatus}`
        );
        party.waitlistEntry.status = nextStatus;
      } catch (error) {
        console.error("Error updating status:", error);
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
          console.error("Error canceling entry:", error);
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

.tiny-text {
  font-size: 12px;
  font-weight: 600;
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

.sort-button {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 9999px;
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
