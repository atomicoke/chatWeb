import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/index.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/index.vue"),
  },
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect:'/home',
    children:[
      {
        path: "/home",
        name: "home",
        component: () => import("@/view/home/index.vue"),
      }
    ]
  },
  // {
  //   path: "/:pathMatch(.*)",
  //   name: "404",
  //   component: () => import("@/views/404/index.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
