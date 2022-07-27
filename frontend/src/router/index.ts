import { createRouter, createWebHistory, RouteLocation, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import HomeView from '@/views/HomeView.vue';
import ProfileView from '@/views/ProfileView.vue';
import MissionView from '@/views/MissionView.vue';
import TeamView from '@/views/TeamView.vue';
import TeamDetailView from '@/views/TeamDetailView.vue';
import { userStore } from '@/stores/user';
import { teamStore } from '@/stores/team';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/missions',
    component: MissionView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/teams',
    component: TeamView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'team-detail',
    path: '/teams/:id',
    component: TeamDetailView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'join-team',
    path: '/join-team/:teamId',
    redirect(to): RouteLocationRaw {
      return {
        name: 'team-detail',
        params: {
          id: to.params.teamId,
        }
      };
    },
  },
  {
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

router.beforeEach(async (to, from, next) => {
  const user = userStore();

  const requiresAuth = to.meta.requiresAuth;
  if (requiresAuth && !user.isLoggedIn) {
    next('/login')
  } else {
    // Check for join team route
    console.log(to);
    if ('code' in to.query && to.redirectedFrom?.matched.some(record => record.name === 'join-team')) {
      const teamDb = teamStore();
      try {
        await teamDb.joinTeam(to.params.id as string, to.query.code as string);
        next();
      } catch (err: any) {
        // TODO: Maybe notify the user
        console.warn('Cannot join team');
        console.warn(err);
        next('/teams');
      }
    } else {
      next()
    }
  }
});
export default router
