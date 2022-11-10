import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import HomeView from '../views/HomeView';
import AddView from '../views/AddView';
import EditView from '../views/EditView';
import NotFound from '../views/NotFoundView';

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
  },
  {
    path: '/products/:id',
    name: 'edit',
    component: EditView,
    props: true,
    beforeEnter: requiredAuth
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoginView,
    afterEnter: signOut(auth)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
