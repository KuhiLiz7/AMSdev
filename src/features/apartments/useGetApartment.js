import { useQuery } from '@tanstack/react-query';
import { getApartment } from '../../services/apiApartments';

function useGetApartment(documentNum) {
  const {
    isLoading,
    data: apartments,
    isError,
    error,
  } = useQuery({
    queryKey: ['apartment', documentNum],
    queryFn: ({ queryKey }) => {
      const [, apartNum] = queryKey;
      return getApartment(apartNum);
    },
  });

  return { isLoading, data: apartments, isError, error };
}

export default useGetApartment;
