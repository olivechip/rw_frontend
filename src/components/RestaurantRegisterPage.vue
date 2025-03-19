<template>
  <div>
    <template v-if="showRestaurantForm">
      <RestaurantRegisterForm @restaurant-submitted="handleRestaurantSubmit" />
    </template>
    <template v-if="showStaffForm">
      <StaffRegisterForm :isAdmin="true" @staff-submitted="handleStaffSubmit" />
    </template>
  </div>
</template>

<script>
import RestaurantRegisterForm from "./RestaurantRegisterForm.vue";
import StaffRegisterForm from "./StaffRegisterForm.vue";
import axios from "axios";

export default {
  name: "RestaurantRegisterPage",
  components: {
    RestaurantRegisterForm,
    StaffRegisterForm,
  },
  data() {
    return {
      showRestaurantForm: true,
      showStaffForm: false,
      restaurantData: {},
      resId: null,
    };
  },
  methods: {
    async handleRestaurantSubmit(restaurantData) {
      try {
        const restaurantResponse = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/restaurants/create`,
          restaurantData
        );
        this.restaurantData = restaurantResponse.data;
        this.resId = restaurantResponse.data.id;

        this.showStaffForm = true;
        this.showRestaurantForm = false;
        alert("Restaurant created, now create the ADMIN account");
      } catch (error) {
        console.error("Restaurant creation error:", error);
        alert("Error creating restaurant. Please try again.");
      }
    },
    async handleStaffSubmit(staffData) {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/api/staff/create`, {
          staff: staffData,
          restaurantId: this.resId,
        });

        this.showStaffForm = false;

        this.$emit("login-success");
        alert("Admin account created successfully!");
        this.$router.push("/app");
      } catch (error) {
        console.error("Staff creation error:", error);
        alert("Error creating staff account. Please try again.");
      }
    },
  },
};
</script>

<style></style>
