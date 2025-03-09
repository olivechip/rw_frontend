import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ViewPage from "@/components/ViewPage.vue";
import JoinPage from "../components/JoinPage.vue";
import EditPage from "../components/EditPage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/view", name: "ViewPage", component: ViewPage },
  { path: "/join", name: "JoinPage", component: JoinPage },
  { path: "/edit", name: "EditPage", component: EditPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
