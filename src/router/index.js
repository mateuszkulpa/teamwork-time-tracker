import Vue from "vue";
import VueRouter from "vue-router";
import Tracker from "@/views/Tracker.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Tracker",
    component: Tracker
  }
];

const router = new VueRouter({
  routes
});

export default router;
