<template>
  <div class="main">
    <h2 class="main-title">Restaurants</h2>
    <p class="main-description">a list of restaurants i guess</p>
    <div class="restaurant-list">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="restaurant-card"
      >
        <h3 class="restaurant-name">{{ restaurant.name }}</h3>
        <p class="restaurant-description">{{ restaurant.description }}</p>
        <p class="restaurant-location">
          <span class="location-icon">📍</span>{{ restaurant.address }}
        </p>
        <button class="view-waitlist-button">View Waitlist</button></div>
      </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
// import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "RestaurantsPage",
  setup() {
    const restaurants = ref([]);

    const getRestaurants = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/restaurants`
        );
        restaurants.value = data;
        console.log("Restaurants fetched:", data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        return [];
      }
    };

    onMounted(() => {
      getRestaurants();
    });

    return {
      restaurants,
    };
  },
};
</script>

<style>
.restaurant-card {
  margin-bottom: 2rem;
}
.view-waitlist-button {
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

.view-waitlist-button:hover {
  background-color: #b91c1c;
}
</style>
