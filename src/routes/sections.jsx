import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AppLayout from 'src/layouts';

export const BookList = lazy(() => import('src/pages/booklist/book-list'));
export const LoginView = lazy(() => import('src/pages/login-view'));
export const Page404 = lazy(() => import('src/pages/not-found-view'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AppLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AppLayout>
      ),
      children: [
        { element: <BookList />, index: true },
        { path: 'books', element: <BookList />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginView />,
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
