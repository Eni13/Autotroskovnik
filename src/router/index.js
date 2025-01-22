import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      needsUser: true,
    }
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
//router.beforeEach((to, from, next) => {
  //console.log('stara ruta', from.name, '->', to.name, 'korisnik', store.currentUser);
  
 // const noUser = store.currentUser == '';

   // if (noUser && to.meta.needsUser) {
      //  next('login');
   // } else {
      //  next();
    //}
//});

export default router;
