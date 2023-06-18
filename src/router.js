import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/game",
    component: Game,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
