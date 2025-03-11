<template>
  <div>
    <WaitlistHeader />
    <RestaurantRegisterForm @restaurant-created="handleRestaurantCreated" />
    <template v-if="showStaffForm">
      <StaffRegisterForm :isAdmin="true" />
    </template>
    <WaitlistFooter />
  </div>
</template>

<script>
import axios from "axios";
import WaitlistHeader from "./WaitlistHeader.vue";
import RestaurantRegisterForm from "./RestaurantRegisterForm.vue";
import StaffRegisterForm from "./StaffRegisterForm.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "RestaurantRegisterPage",
  components: {
    WaitlistHeader,
    RestaurantRegisterForm,
    StaffRegisterForm,
    WaitlistFooter,
  },
  data() {
    return {
      resId: null,
      showStaffForm: false,
      userData: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "",
      },
      restaurantData: {},
    };
  },
  methods: {
    async handleRestaurantCreated(restaurantData) {
      this.restaurantData = restaurantData;
      try {
        const restaurantResponse = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/restaurants`,
          restaurantData
        );
        this.resId = restaurantResponse.data.resId;
        this.showStaffForm = true;
        alert("Restaurant Created, now Create the admin account");
      } catch (error) {
        console.error("Restaurant creation error:", error);
        alert("Error creating restaurant. Please try again.");
      }
    },
    async handleStaffSubmit() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/api/users`, {
          ...this.userData,
          resId: this.resId,
        });
        this.showStaffForm = false;
        alert("Admin account created successfully!");
      } catch (error) {
        console.error("Staff creation error:", error);
        alert("Error creating staff account. Please try again.");
      }
    },
  },
};
</script>

<style></style>
