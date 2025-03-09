<template>
  <header class="header">
    <div class="header-content">
      <h1 class="logo">the soOP kitchen</h1>
      <nav class="desktop-nav">
        <!-- available to public -->
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/view" class="nav-link">View Waitlist</router-link>

        <!-- only if client is logged in as staff/manager/admin (host device) -->
        <router-link to="/join" class="nav-link">Join Waitist</router-link>

        <!-- only if client is logged in as manager/admin (all store devices) -->
        <router-link to="/edit" class="nav-link">Edit Waitist</router-link>

        <!-- add these if needed
        <router-link to="#menu" class="nav-link">Menu</router-link>
        <router-link to="#about" class="nav-link">About</router-link>
        <router-link to="#contact" class="nav-link">Contact</router-link> -->
      </nav>
    </div>
    <!-- Mobile Navbar -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <a href="#menu" class="mobile-nav-link">Menu</a>
      <a href="#reservations" class="mobile-nav-link">Reservations</a>
      <a href="#about" class="mobile-nav-link">About</a>
      <a href="#contact" class="mobile-nav-link">Contact</a>
    </div>
  </header>
</template>

<script>
export default {
  name: "WaitlistHeader",
  data() {
    return {
      isMenuOpen: false,
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

.logo {
  font-size: 1.5rem;
  font-weight: bold;
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
