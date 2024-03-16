import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
import { authGuard,  } from "@auth0/auth0-vue";
import HomeView from '../views/HomeView.vue'
import CallbackView from '../views/CallbackView.vue'
import { auth0 } from '../auth0';

async function routeGuard(to: RouteLocation) {
  const result = await authGuard(to);

  if (result) {
    const token = await auth0.getAccessTokenSilently();
    console.log(token);
    return true;
  }

  return false;
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: routeGuard
    },
    {
      path: "/callback",
      name: "callback",
      component: CallbackView
    },
  ]
})

export default router
