import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApartment } from '../../services/apiApartments';
import toast from 'react-hot-toast';

function useApartment() {
  const queryClient = useQueryClient();

  const {
    mutate: newApartment,
    isPending,
    error,
  } = useMutation({
    mutationFn: data => createApartment(data),
    onSuccess: () => {
      console.log('successfully created an apartment!');
      toast.success('successfully created an apartment!');
      queryClient.invalidateQueries({ queryKey: ['apartment'] });
    },
    onError: err => {
      console.log(err.response.data.error.message);
      console.log(err);
    },
  });

  return { newApartment, isPending, error };
}

export default useApartment;
