import { useQuery } from '@tanstack/react-query';
import { getAllUnits } from '../../services/apiUnits';

function useUnits() {
  const {
    data: units,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['units'],
    queryFn: getAllUnits,
  });

  return { data: units, isLoading, isError, error };
}

export default useUnits;
