import { createRouter, createWebHistory } from 'vue-router/auto'
import { useUserStore } from '../stores/userStore';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../auth/Login.vue'),
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('../auth/Unauthorized.vue'),
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: () => import('../pages/Marketplace.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/payment',
    name: 'CustomerPayment',
    component: () => import('../pages/Customer/Payment.vue'),
    meta: { requiresAuth: true,} //Don't forget to add roles back again
  },
  {
    path: '/farmer',
    name: 'Farmer',
    component: () => import('../pages/Customer/Farmers.vue'),
    meta: { requiresAuth: true,} //Don't forget to add roles back again
  },
  {
    path: '/profile-customer',
    name: 'ProfileCustomer',
    component: () => import('../pages/Customer/ProfileCustomer.vue'),
    meta: { requiresAuth: true,} //Don't forget to add roles back again
  },
  {
    path: '/dashboard-farmer',
    name: 'DashboardFarmer',
    component: () => import('../pages/Farmer/DashboardFarmer.vue'),
    meta: { requiresAuth: true,} //Don't forget to add roles back again
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../pages/Farmer/Goods.vue'),
    meta: { requiresAuth: true,} //Don't forget to add roles back again
  },
  {
    path: '/profile-farmer',
    name: 'ProfileFarmer',
    component: () => import('../pages/Farmer/ProfileFarmer.vue'),
    meta: { requiresAuth: true,} //Don't forget to add roles back again
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next)=>{
  const isAuthenticated = !!localStorage.getItem('authToken'); //check login
  const userStore =  useUserStore();
  const userRole = userStore.user?.role

  if(to.meta.requiresAuth && !isAuthenticated){
    next({ name: 'LoginPage' }); //redirect to login
  }
  if(to.meta.role && to.meta.role !== userRole){
    next('/unauthorized')
  }
  else{
    next();
  }
})


export default router;