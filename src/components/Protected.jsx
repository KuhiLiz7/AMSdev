import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useUser from '../features/authentication/useUser';

function Protected({ children }) {
  /**Checking whether there is a cached user */
  const { data: user } = useQuery({
    queryKey: ['user'],
    enabled: false,
  });

  const { isauthenticated } = useUser();
  console.log(isauthenticated);
  /**TODO:IMPLEMENT A GLOBAL LOADER FALLBACK */

  console.log(user);

  return user ? children : <Navigate to="/login" replace />;
}

export default Protected;
