import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Edit.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const rutaProtegida = to.matched.some((record) => record.meta.requireAuth);

  store.commit("moduleAuth/setErrors", null);

  if (!rutaProtegida) return next();

  if (localStorage.getItem("token")) {
    // console.log(store.state.moduleAuth.token);
    // console.log(await store.dispatch("moduleAuth/verificarToken"));
    if (await store.dispatch("moduleAuth/verificarToken")) {
      next();
    } else {
      next("/login");
    }
  } else {
    next("/login");
  }
});

export default router;
