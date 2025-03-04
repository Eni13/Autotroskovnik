import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
{
  path: '/troskovi',
  name: 'troskovi',
  component: () => import(/* webpackChunkName: "menu" */ '../views/dodajtrosak.vue'),
  meta: {
    needsUser: true,
  }
},
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;