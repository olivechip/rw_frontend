<template>
  <div class="app">
    <WaitlistHeader />
    <WaitlistMain />
    <WaitlistFooter />
  </div>
</template>

<script>
import WaitlistHeader from "./components/WaitlistHeader.vue";
import WaitlistMain from "./components/WaitlistMain.vue";
import WaitlistFooter from "./components/WaitlistFooter.vue";

export default {
  name: "App",
  components: {
    WaitlistHeader,
    WaitlistMain,
    WaitlistFooter,
  },
};
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #3e3e3e;
}

.app {
  display: flex;
  flex-direction: column;
  color: #d7d7d7;
  background: #121212;
  min-height: 100vh;
}
</style>
