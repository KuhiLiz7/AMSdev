import { Navigate, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import useUser from '../features/authentication/useUser';
import { useEffect } from 'react';

function Protected({ children }) {
  const navigate = useNavigate();
  /**Checking whether there is a cached user */
  // const { data: user } = useQuery({
  //   queryKey: ['user'],
  //   enabled: false,
  // });

  const { currentUser, isLoading, error } = useUser();

  // useEffect(
  //   function () {
  //     if (!currentUser && !isLoading) navigate('/login');
  //   },
  //   [currentUser, isLoading, navigate],
  // );
  console.log(error);

  if (isLoading) return <div>Loading...</div>;

  if (!currentUser) {
    console.log('no user found');
    return <Navigate to="/login" replace />;
  }

  return children;
  // return currentUser ? children : <Navigate to="/login" replace />;
}

export default Protected;
