import { RouteRecordRaw } from 'vue-router';
import SignIn from 'pages/SignIn/SignIn.vue';
import LoginLayout from 'layouts/LoginLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: LoginLayout,
    children: [{ path: '', name: 'login', component: SignIn }],
    meta: { public: true },
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('pages/Dashboard/DashboardPage.vue'),
        meta: { public: false },
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
        meta: { public: false },
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
