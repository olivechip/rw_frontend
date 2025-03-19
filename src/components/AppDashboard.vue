<template>
  <div>
    <WaitlistMain />
    <WaitlistFooter />
  </div>
</template>

<script>
import WaitlistMain from "./WaitlistMain.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "AppDashboard",
  components: {
    WaitlistMain,
    WaitlistFooter,
  },
};
</script>
