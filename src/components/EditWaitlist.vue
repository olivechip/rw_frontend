<template>
  <div>
    <WaitlistHeader />
    <CurrentParties />
    <WaitlistFooter />
  </div>
</template>

<script>
import CurrentParties from "./CurrentParties.vue";
import WaitlistHeader from "./WaitlistHeader.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "EditWaitlist",
  components: {
    CurrentParties,
    WaitlistHeader,
    WaitlistFooter,
  },
};
</script>
