import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
import { authGuard,  } from "@auth0/auth0-vue";
import AppLayout from '@/layout/AppLayout.vue';
import HomeView from '@/views/HomeView.vue'
import CallbackView from '@/views/CallbackView.vue'
import { auth0 } from '../auth0';
import { supabase } from '../db.ts';

async function routeGuard(to: RouteLocation) {
  const result = await authGuard(to);

  if (result) {
    const token = await auth0.getAccessTokenSilently();
    console.log('auth0', token);
    const res = await supabase.functions.invoke('create-session', { headers: { authorization: `Bearer ${token}` }});
    const b = await supabase.auth.getUser(res.data.access_token);

    console.log(await supabase.rpc('get_user_id_by_email', { email: 'hello@jonathandupre.com' }));

    console.log(b);
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
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          // beforeEnter: routeGuard
        },
        {
          path: "/callback",
          name: "callback",
          component: CallbackView
        }
      ]
    },
  ]
})

export default router
