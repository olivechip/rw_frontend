<template>
  <div>
    <WaitlistHeader />
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="partySize">Party Size:</label>
        <input type="number" id="partySize" v-model="partySize" />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" v-model="phoneNumber" />
      </div>
      <button type="submit">Join Waitlist</button>
    </form>
    <WaitlistFooter />
  </div>
</template>

<script>
import WaitlistHeader from "./WaitlistHeader.vue";
import WaitlistFooter from "./WaitlistFooter.vue";
import axios from "axios";
import { API_URL } from "../config";

export default {
  name: "JoinWaitlist",
  components: {
    WaitlistHeader,
    WaitlistFooter,
  },
  data() {
    return {
      name: "",
      partySize: 1,
      phoneNumber: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // AWS RDS: send a POST request to the server
        await axios.post(`${API_URL}/api/waitlist/create`, {
          name: this.name,
          partySize: this.partySize,
          phoneNumber: this.phoneNumber,
        });

        // LOCAL: Emit an event with the new waitlist entry data
        // console.log(this.name, this.partySize, this.phoneNumber);
        // this.$emit("add-waitlist-entry", {
        //   name: this.name,
        //   partySize: this.partySize,
        //   waitTime: 10,
        //   status: "Waiting",
        // });

        alert("You have been added to the waitlist!");

        this.$router.push("/");
      } catch (error) {
        alert("Error joining waitlist. Please try again later.");
      }
    },
  },
};
</script>
