<template>
  <div>
    <WaitlistHeader />
    <CurrentWaitlist view="guests" />
    <WaitlistFooter />
  </div>
</template>

<script>
import CurrentWaitlist from "./CurrentWaitlist.vue";
import WaitlistHeader from "./WaitlistHeader.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "EditWaitlist",
  components: {
    CurrentWaitlist,
    WaitlistHeader,
    WaitlistFooter,
  },
};
</script>
