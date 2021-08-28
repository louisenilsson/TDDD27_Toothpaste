import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth/authGuard"
import Home from '../views/Home';
import BookedAppointments from '../views/BookedAppointments.vue';
import About from '../views/About';
import Profile from '../views/Profile';


Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
        name: 'appointments',
        path: '/appointments',
        component: BookedAppointments,
        beforeEnter: authGuard
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile,
      beforeEnter: authGuard
    },
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
