<template>
  <section class="current-parties">
    <div class="container">
      <h3 class="parties-title">
        <span class="title-text">
          {{ view === "staff" ? "Complete Waitlist" : "Current Waitlist" }}
        </span>
        <RefreshButton @refresh="getWaitlist" />
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
                  @click="sortByTimeJoined"
                  >▼
                </span>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="party in sortedWaitlist" :key="party.id">
              <td>
                {{
                  ["COMPLETED", "CANCELED"].includes(party.status)
                    ? "-"
                    : getWaitlistPosition(party)
                }}
              </td>
              <td>{{ party.guest.name }}</td>
              <td>{{ party.guest.partySize }}</td>
              <!-- <td v-if="view === 'staff'">{{ party.phoneNumber }}</td> -->
              <td>{{ formatDateTime(party.joinTime) }}</td>
              <td>
                <span
                  v-if="['WAITING', 'NOTIFIED'].includes(party.status)"
                  :class="`status-badge ${party.status.toLowerCase()} ${
                    view === 'staff' ? 'clickable' : ''
                  }`"
                  @click="view === 'staff' ? updateStatus(party) : null"
                >
                  {{ party.status }}
                </span>
                <span
                  v-else
                  :class="`status-badge ${party.status.toLowerCase()} unclickable`"
                >
                  {{ party.status }}
                </span>
                <span
                  v-if="
                    view === 'staff' &&
                    !['COMPLETED', 'CANCELED'].includes(party.status)
                  "
                  @click="cancelEntry(party)"
                  aria-label="Cancel"
                  class="cancel-badge"
                  >X</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import RefreshButton from "./RefreshButton.vue";

export default {
  name: "CurrentWaitlist",
  components: { RefreshButton },
  props: {
    view: { type: String, default: "guests" },
  },
  setup(props) {
    const store = useStore();
    const waitlist = ref([]);
    const lastUpdated = ref(new Date().toLocaleTimeString());
    const sortBy = ref(null);
    const restaurantId = computed(() => store.getters.restaurantId);

    const filteredWaitlist = computed(() => {
      return waitlist.value.filter((party) =>
        props.view === "staff"
          ? true
          : ["WAITING", "NOTIFIED"].includes(party.status)
      );
    });

    const sortedWaitlist = computed(() => {
      return [...filteredWaitlist.value].sort((a, b) => {
        if (sortBy.value === "position") {
          const posA = ["COMPLETED", "CANCELED"].includes(a.status)
            ? Infinity
            : filteredWaitlist.value.indexOf(a) + 1;
          const posB = ["COMPLETED", "CANCELED"].includes(b.status)
            ? Infinity
            : filteredWaitlist.value.indexOf(b) + 1;

          if (posA !== posB) return posA - posB;
          return new Date(a.joinTime) - new Date(b.joinTime);
        } else if (sortBy.value === "name") {
          return a.guest.name.localeCompare(b.guest.name);
        } else if (sortBy.value === "timeJoined") {
          return new Date(a.joinTime) - new Date(b.joinTime);
        }
        return 0;
      });
    });

    const getWaitlist = async () => {
      if (!restaurantId.value) {
        console.error("Restaurant ID not found.");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/waitlist/restaurants/${restaurantId.value}`
        );
        waitlist.value = data;
        lastUpdated.value = new Date().toLocaleTimeString();
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    const sortByPosition = () => (sortBy.value = "position");
    const sortByName = () => (sortBy.value = "name");
    const sortByTimeJoined = () => (sortBy.value = "timeJoined");

    const getWaitlistPosition = (party) => {
      const filtered = filteredWaitlist.value.filter(
        (p) => !["COMPLETED", "CANCELED"].includes(p.status)
      );
      const position = filtered.findIndex((p) => p.id === party.id) + 1;
      return position;
    };

    const formatDateTime = (utcTime) => {
      return new Date(`${utcTime}Z`).toLocaleTimeString();
    };

    const updateStatus = async (party) => {
      const nextStatusMap = { WAITING: "NOTIFIED", NOTIFIED: "COMPLETED" };
      const nextStatus = nextStatusMap[party.status];
      if (!nextStatus) return;

      if (confirm(`Mark ${party.guest.name}'s status as ${nextStatus}?`)) {
        try {
          await axios.patch(
            `${process.env.VUE_APP_API_URL}/api/waitlist/${party.id}`,
            { status: nextStatus }
          );
          party.status = nextStatus;
          getWaitlist();
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
    };

    const cancelEntry = async (party) => {
      if (confirm(`Mark ${party.guest.name}'s status as CANCELED?`)) {
        try {
          await axios.patch(
            `${process.env.VUE_APP_API_URL}/api/waitlist/${party.id}`,
            { status: "CANCELED" }
          );
          getWaitlist();
        } catch (error) {
          console.error("Error canceling entry:", error);
        }
      }
    };

    onMounted(() => {
      getWaitlist();
    });

    return {
      waitlist,
      lastUpdated,
      filteredWaitlist,
      sortedWaitlist,
      getWaitlist,
      sortByPosition,
      sortByName,
      sortByTimeJoined,
      getWaitlistPosition,
      formatDateTime,
      updateStatus,
      cancelEntry,
      restaurantId,
    };
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

.cancel-badge {
  display: inline-block;
  margin: 0.25rem 0.75rem;
  padding: 0.25rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
  color: #a11c1c;
  color: #a3a3a3;
  cursor: pointer;
}

.cancel-badge:hover {
  opacity: 0.8;
}
</style>
