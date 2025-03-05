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
                Position
                <span
                  v-if="view === 'staff'"
                  class="sort-icon"
                  @click="sortByPosition"
                  >▼
                </span>
              </th>
              <th>
                Name
                <span
                  v-if="view === 'staff'"
                  class="sort-icon"
                  @click="sortByName"
                  >▼
                </span>
              </th>
              <th>Party Size</th>
              <!-- <th v-if="view == 'staff'">Phone Number</th> -->
              <th>
                Time Joined
                <span
                  v-if="view === 'staff'"
                  class="sort-icon"
                  @click="sortByPosition"
                  >▼
                </span>
              </th>
              <th>Status</th>
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
              <!-- <td v-if="view === 'staff'">{{ party.phoneNumber }}</td> -->
              <td>{{ formatDateTime(party.waitlistEntry.joinTime) }}</td>
              <td>
                <span
                  v-if="
                    ['WAITING', 'NOTIFIED'].includes(party.waitlistEntry.status)
                  "
                  :class="`status-badge ${party.waitlistEntry.status.toLowerCase()} ${
                    view === 'staff' ? 'clickable' : null
                  }`"
                  @click="view === 'staff' ? updateStatus(party) : null"
                >
                  {{ party.waitlistEntry.status }}
                </span>
                <span
                  v-else
                  :class="`status-badge ${party.waitlistEntry.status.toLowerCase()} unclickable`"
                >
                  {{ party.waitlistEntry.status }}
                </span>
                <button
                  v-if="
                    view === 'staff' &&
                    party.waitlistEntry.status !== 'COMPLETED' &&
                    party.waitlistEntry.status !== 'CANCELED'
                  "
                  @click="cancelEntry(party)"
                  aria-label="Cancel"
                  class="cancel-button"
                ></button>
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
          return positionA - positionB;
        } else if (this.sortBy === "name") {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else if (this.sortBy === "timeJoined") {
            const timeA = new Date(a.waitlistEntry.joinTime);
            const timeB = new Date(b.waitlistEntry.joinTime);
            return timeA - timeB;
          } else {
            return 0;
          }
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

        // this emit should update the Main component for totalWaitTime
        this.$emit("waitlist-updated", this.waitlist);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    },
    sortByPosition() {
      this.sortBy = "position";
    },
    sortByName() {
      this.sortBy = "name";
    },
    sortByTimeJoined() {
      this.sortBy = "timeJoined";
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
      return `${date.toLocaleTimeString()}`;
    },
    async updateStatus(party) {
      const nextStatusMap = { WAITING: "NOTIFIED", NOTIFIED: "COMPLETED" };
      const nextStatus = nextStatusMap[party.waitlistEntry.status];

      if (!nextStatus) return;

      if (
        confirm(
          `Are you sure you want to mark ${party.name}'s status as ${nextStatus}?`
        )
      ) {
        try {
          await axios.put(
            `${process.env.VUE_APP_API_URL}/api/waitlist/${party.id}/${nextStatus}`
          );
          party.waitlistEntry.status = nextStatus;
          this.getGuests();
        } catch (error) {
          console.error("Error updating status:", error);
        }
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
            `${process.env.VUE_APP_API_URL}/api/waitlist/${party.id}/CANCELED`
          );
          party.waitlistEntry.status = "CANCELED";
          this.getGuests();
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

.sort-icon {
  font-size: 0.8em;
  margin-left: 0.25rem;
  cursor: pointer;
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

.status-badge.clickable {
  cursor: pointer;
}

.status-badge.unclickable {
  cursor: not-allowed;
  opacity: 0.7;
}

.status-badge.clickable:hover {
  opacity: 0.8;
}
</style>
