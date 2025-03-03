import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUnit } from '../../services/apiUnits';
import toast from 'react-hot-toast';

function useDeleteUnit() {
  const queryClient = useQueryClient();

  const { mutate: deleteunit, isPending } = useMutation({
    mutationFn: unitId => deleteUnit(unitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast.success('deleted unit successfully');
    },
    onError: error => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { deleteunit, isPending };
}

export default useDeleteUnit;
