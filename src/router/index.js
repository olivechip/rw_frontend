import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import JoinWaitlist from "../components/JoinWaitlist.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/join", name: "JoinWaitlist", component: JoinWaitlist },
  { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;