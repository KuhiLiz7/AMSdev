import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../services/apiUser';

function useUsers() {
  const {
    data: allusers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
  console.log(allusers);
  return { allusers, isLoading, error };
}

export default useUsers;
