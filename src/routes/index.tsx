import { createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Tracks from '@/pages/Tracks';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Home from '@/pages/Home';
import { ROUTES } from './paths';

const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.TRACKS,
        element: <Tracks />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
