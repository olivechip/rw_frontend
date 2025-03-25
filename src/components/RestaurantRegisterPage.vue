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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import RestaurantRegisterForm from "./RestaurantRegisterForm.vue";
import StaffRegisterForm from "./StaffRegisterForm.vue";

export default {
  name: "RestaurantRegisterPage",
  components: {
    RestaurantRegisterForm,
    StaffRegisterForm,
  },
  setup() {
    const showRestaurantForm = ref(true);
    const showStaffForm = ref(false);
    const restaurantData = reactive({});
    const resId = ref(null);
    const router = useRouter();
    const store = useStore();

    const handleRestaurantSubmit = async (data) => {
      try {
        const restaurantResponse = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/restaurants/create`,
          data
        );
        resId.value = restaurantResponse.data.id;

        showStaffForm.value = true;
        showRestaurantForm.value = false;
        alert("Restaurant created, now create the ADMIN account");
      } catch (error) {
        console.error("Restaurant creation error:", error);
        alert("Error creating restaurant. Please try again.");
      }
    };

    const handleStaffSubmit = async (staffData) => {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/api/staff/create`, {
          staff: staffData,
          restaurantId: resId.value,
        });

        showStaffForm.value = false;
        alert("Admin account created successfully! Logging in...");
        await handleLogin(staffData);
      } catch (error) {
        console.error("Staff creation error:", error);
        alert("Error creating staff account. Please try again.");
      }
    };

    const handleLogin = async (staffData) => {
      try {
        const loginResponse = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/auth/login`,
          {
            username: staffData.username,
            password: staffData.password,
          }
        );

        console.log(loginResponse);
        store.dispatch("setStaff", loginResponse.data);

        router.push("/app");
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      }
    };

    return {
      showRestaurantForm,
      showStaffForm,
      restaurantData,
      resId,
      handleRestaurantSubmit,
      handleStaffSubmit,
    };
  },
};
</script>

<style></style>
