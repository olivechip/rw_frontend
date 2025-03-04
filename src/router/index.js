import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import JoinWaitlist from "../components/JoinWaitlist.vue";
import EditWaitlist from "../components/EditWaitlist.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/join-waitlist", name: "JoinWaitlist", component: JoinWaitlist },
  { path: "/edit-waitlist", name: "EditWaitlist", component: EditWaitlist },
  { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;