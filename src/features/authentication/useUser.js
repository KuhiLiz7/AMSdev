import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../services/apiAuth';

function useUser() {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    // retry: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    onError: err => {
      console.error('useQuery onError:', err.message); // Log query-specific errors
    },
  });

  console.log('useUser state:', { currentUser, isLoading, error });

  return { currentUser, isLoading, error };
}

export default useUser;
