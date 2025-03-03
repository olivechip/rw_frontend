<template>
  <div>
    <WaitlistHeader />
    <WaitlistMain />
    <WaitlistFooter />
  </div>
</template>

<script>
import WaitlistHeader from "./WaitlistHeader.vue";
import WaitlistMain from "./WaitlistMain.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "HomePage",
  components: {
    WaitlistHeader,
    WaitlistMain,
    WaitlistFooter,
  },
};
</script>
