import { useQuery } from '@tanstack/react-query';
import { getAllApartments } from '../../services/apiApartments';

function useAllApartments() {
  const {
    isLoading,
    data: apartments,
    isError,
    error,
  } = useQuery({
    queryKey: ['apartment'],
    queryFn: getAllApartments,
  });

  return { isLoading, apartments, isError, error };
}

export default useAllApartments;
