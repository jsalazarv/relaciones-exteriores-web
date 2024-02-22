import { RouteRecordRaw } from 'vue-router';
import Cookies from 'js-cookie';
import SignIn from 'pages/SignIn/SignIn.vue';
import LoginLayout from 'layouts/LoginLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: LoginLayout,
    children: [{ path: '', name: 'login', component: SignIn }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('pages/Dashboard/DashboardPage.vue'),
        // beforeEnter: (to, from, next) => {
        //   if (Cookies.get('token') !== undefined) {
        //     return false;
        //   }
        //   if (Cookies.get('token') === undefined) {
        //     next({ name: 'login' });
        //   }

        //   next();
        // },
      },
    ],
  },
  {
    path: '/employees',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'employees',
        component: () => import('pages/Employees/EmployeesPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
