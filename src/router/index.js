import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import HomeView from '../views/HomeView';
import AddView from '../views/AddView';

const requiredAuth = (to, from, next) => {
  let user = auth.currentUser;
  
  if (!user) {
    next({ name: 'login' });
  } else {
    next();
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requiredAuth
  },
  {
    path: '/add',
    name: 'add',
    component: AddView,
    beforeEnter: requiredAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
