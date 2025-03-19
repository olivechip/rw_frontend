<template>
  <div>
    <CurrentWaitlist view="guests" />
    <WaitlistFooter />
  </div>
</template>

<script>
import CurrentWaitlist from "./CurrentWaitlist.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "EditWaitlist",
  components: {
    CurrentWaitlist,
    WaitlistFooter,
  },
};
</script>
