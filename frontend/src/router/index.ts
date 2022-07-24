import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import HomeView from '@/views/HomeView.vue';
import ProfileView from '@/views/ProfileView.vue';
import MissionView from '@/views/MissionView.vue';
import MissionPlanningView from '@/views/MissionPlanningView.vue';
import { userStore } from '@/stores/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  }, {
    path: '/register',
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  }, {
    path: '/profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/missions',
    component: MissionView,
    meta: {
      requiresAuth: true,
    },
  }, {
    name: 'mission-planning',
    path: '/missions/:id',
    component: MissionPlanningView,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = userStore();

  const requiresAuth = to.meta.requiresAuth;
  if (requiresAuth && !user.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
});
export default router
