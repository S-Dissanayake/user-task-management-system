import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layout/dashboard';

export const Dashboard = lazy(()=> import('../pages/dashboard/view/Dashboard'));
export const LoginPage = lazy(()=> import('../pages/login/Login'));
export const Page404 = lazy(()=> import('../pages/pageNotFound/PageNotFound'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
      index: true
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <Dashboard />},
      ],
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
