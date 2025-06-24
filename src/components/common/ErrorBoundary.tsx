import { useRouteError, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { customToast } from '../ui/toasts';
import { ROUTES } from '@/routes/paths';

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      customToast.error(`Error: ${error instanceof Error ? error.message : error}`);
    }

    navigate(ROUTES.HOME);
  }, [error, navigate]);

  return null;
}

export default ErrorBoundary;
