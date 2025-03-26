<template>
  <header class="header">
    <div class="header-content">
      <router-link :to="staff ? '/app' : '/'" class="logo-link">
        <h1 class="logo">
          {{ restaurant?.name || "The Waitlist Manager" }}
        </h1>
      </router-link>

      <nav class="desktop-nav">
        <!-- always visible -->
        <router-link to="/view" class="nav-link">View Waitlist</router-link>

        <!-- waitlist management for logged in staff -->
        <template v-if="staff">
          <router-link to="/join" class="nav-link" v-if="isStaffOrAbove">
            Join Waitlist
          </router-link>
          <router-link to="/edit" class="nav-link" v-if="isAdminOrManager">
            Edit Waitlist
          </router-link>
          <router-link
            to=""
            class="nav-link"
            @click.prevent="$emit('logout-submitted')"
          >
            Logout
          </router-link>
        </template>

        <!-- sign up or login if not logged in -->
        <template v-if="!staff">
          <router-link to="/register" class="nav-link">Sign Up</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
        </template>
      </nav>
    </div>

    <!-- <div v-if="isMenuOpen" class="mobile-menu">
      <a href="#menu" class="mobile-nav-link">Menu</a>
      <a href="#reservations" class="mobile-nav-link">Reservations</a>
      <a href="#about" class="mobile-nav-link">About</a>
      <a href="#contact" class="mobile-nav-link">Contact</a>
    </div> -->
  </header>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "WaitlistHeader",
  setup() {
    const store = useStore();
    const staff = computed(() => store.getters.staff);
    const restaurant = computed(() => store.getters.restaurant);

    const isStaffOrAbove = computed(() => {
      return (
        staff.value && ["STAFF", "ADMIN", "MANAGER"].includes(staff.value.role)
      );
    });

    const isAdminOrManager = computed(() => {
      return staff.value && ["ADMIN", "MANAGER"].includes(staff.value.role);
    });

    const isMenuOpen = ref(false);

    return {
      staff,
      restaurant,
      isStaffOrAbove,
      isAdminOrManager,
      isMenuOpen,
    };
  },
};
</script>

<style>
.header {
  background: #121212;
  border-bottom: 1px solid #464646;
  position: relative;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  text-decoration: none;
  color: #d7d7d7;
}

.logo-link:hover {
  cursor: pointer;
}

.logo {
  font-size: 1.5rem;
}

.desktop-nav {
  display: none;
}

.nav-link {
  color: #d7d7d7;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 500;
}

.nav-link:hover {
  color: #dc2626;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #464646;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
  font-weight: 500;
}

/* Responsive design */
@media (min-width: 768px) {
  .menu-button {
    display: none;
  }

  .desktop-nav {
    display: block;
  }

  .steps-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .main-title {
    font-size: 3rem;
  }
}
</style>
