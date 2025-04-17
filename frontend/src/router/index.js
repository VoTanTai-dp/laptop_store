import { createWebHistory, createRouter } from 'vue-router';
import LaptopStore from '@/views/LaptopStore.vue';
import CartPage from '@/views/CartPage.vue';
import DataManagement from '@/views/DataManagement.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import LaptopDetail from '@/views/LaptopDetail.vue';
const routes = [
  {
    path: '/',
    name: 'laptopstore',
    component: LaptopStore,
    props: (route) => ({ searchText: route.query.searchText })
  },
  {
    path: '/carts',
    name: 'cartpage',
    component: CartPage
  },
  {
    path: '/data',
    name: 'datamanagement',
    component: DataManagement
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/laptop/:id',
    name: 'laptopdetail',
    component: LaptopDetail
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
