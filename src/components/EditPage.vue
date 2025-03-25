<template>
  <div>
    <CurrentWaitlist :view="'staff'" :restaurantId="restaurantId" />
    <WaitlistFooter />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CurrentWaitlist from "./CurrentWaitlist.vue";
import WaitlistFooter from "./WaitlistFooter.vue";

export default {
  name: "EditPage",
  components: {
    CurrentWaitlist,
    WaitlistFooter,
  },
  setup() {
    const store = useStore();

    const restaurantId = computed(() => {
      return store.state.staff?.restaurant?.id;
    });

    return {
      restaurantId,
    };
  },
};
</script>
