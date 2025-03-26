<template>
  <div>
    <CurrentWaitlist :view="'guests'" :restaurantId="restaurantId" />
    <WaitlistFooter />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CurrentWaitlist from "./CurrentWaitlist.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "ViewPage",
  components: {
    CurrentWaitlist,
    WaitlistFooter,
  },
  setup() {
    const store = useStore();

    const restaurantId = computed(() => store.getters.restaurantId);

    return {
      restaurantId,
    };
  },
};
</script>
