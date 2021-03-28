import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exercises',
    props: true,
    name: 'Exercises',
    component: () => import( /* webpackChunkName: "workout" */ '../views/Exercises.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workouts',
    props: true,
    name: 'Workouts',
    component: () => import( /* webpackChunkName: "workout" */ '../views/Workouts.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workout/:workoutId',
    props: true,
    name: 'Workout',
    component: () => import( /* webpackChunkName: "workout" */ '../views/Workout.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/active-workout/:workoutId',
    props: true,
    name: 'ActiveWorkout',
    component: () => import( /* webpackChunkName: "activeWorkout" */ '../views/ActiveWorkout.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }

})

export default router