import { createRouter, createWebHistory } from 'vue-router'
import AuthAPI from '@/api/AuthAPI';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: {
        requiresAdmin: true
      },
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('@/views/admin/AppointmentsView.vue'),
        }
      ],
    },
    {
      path: '/reservaciones',
      component: () => import('@/views/appointments/AppointmentsLayout.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('@/views/appointments/MyAppointmentsView.vue'),
        },
        {
          path: 'crear',
          component: ()  => import('@/views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'appointments.create',
              component: () => import('@/views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointments.details',
              component: () => import('@/views/appointments/AppointmentView.vue'),
            }
          ],
        },
        {
          path: ':id/editar',
          component: () => import('@/views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'appointments.edit',
              component: () => import('@/views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointments.edit.details',
              component: () => import('@/views/appointments/AppointmentView.vue'),
            }
          ],
        }
      ],
    }, 
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('@/views/auth/ConfirmAccountView.vue'),
        },
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'reset-password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
        }
      ],
    }
  ]
});

router.beforeEach((to, _from, next) => {
  if(!to.name) return next({name: 'my-appointments'});
  next();
});

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);

  if(requiresAuth) {
    try {
      const {data} = await AuthAPI.user();

      if(data.admin) {
        next({name: 'admin'});
      } else {
        next();
      }
    } catch {
      next({name: 'login'});
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, _from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin);

  if(requiresAdmin) {
    try {
      await AuthAPI.admin();
      next();
    } catch {
      next({name: 'my-appointments'});
    }
  } else {
    next();
  }
});

export default router
