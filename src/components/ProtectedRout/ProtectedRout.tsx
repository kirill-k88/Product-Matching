import { Navigate } from 'react-router-dom';
import { MarkingContext } from '../../contexts/MarkingContext';
import { useContext } from 'react';

export function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { loggedIn } = useContext(MarkingContext);
  if (loggedIn === undefined) {
    return null;
  }
  return loggedIn ? element : <Navigate to="/auth" replace />;
}
