<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-section">
          <h3 class="footer-title">{{ restaurant?.name }}</h3>
          <ul class="footer-list">
            <li>{{ restaurant?.cuisineType }} Cuisine</li>
            <li class="website-link" v-if="restaurant?.website">
              <a :href="restaurant.website" target="_blank"
                >Visit Our Website</a
              >
            </li>
            <li class="restaurant-description" v-if="restaurant?.description">
              {{ restaurant.description }}
            </li>
          </ul>
        </div>

        <div v-if="restaurant?.hoursOfOperation" class="footer-section">
          <h3 class="footer-title">Hours</h3>
          <ul class="footer-list">
            <li>
              {{ restaurant.hoursOfOperation }}
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Contact</h3>
          <ul class="footer-list">
            <li>{{ restaurant?.address }}</li>
            <li>{{ restaurant?.phoneNumber }}</li>
            <li>{{ restaurant?.email }}</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          &copy; {{ currentYear }} The Waitlist Manager. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "WaitlistFooter",
  setup() {
    const store = useStore();
    const restaurant = computed(() => store.getters.restaurant);

    const currentYear = new Date().getFullYear();

    return {
      restaurant,
      currentYear,
    };
  },
};
</script>

<style>
.footer {
  background: #121212;
  border-top: 1px solid #464646;
  padding: 4rem 1rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-grid {
  display: grid;
  gap: 2rem;
}

.footer-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.footer-list {
  list-style: none;
}

.footer-list li {
  margin-bottom: 0.5rem;
}

.website-link {
  text-decoration: none;
  color: #d7d7d7;
}

.restaurant-description {
  font-style: italic;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #464646;
}
</style>
