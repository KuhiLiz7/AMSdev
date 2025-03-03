import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUnit } from '../../services/apiUnits';
import toast from 'react-hot-toast';

function useUnit() {
  const queryClient = useQueryClient();

  const { mutate: newUnit, isPending } = useMutation({
    mutationFn: unitData => createUnit(unitData),
    onSuccess: () => {
      toast.success('Created new unit!');
      queryClient.cancelQueries({ queryKey: ['units'] });
      console.log('Created new unit!');
    },
    onError: error => {
      console.log(error);
    },
  });

  return { newUnit, isPending };
}

export default useUnit;
