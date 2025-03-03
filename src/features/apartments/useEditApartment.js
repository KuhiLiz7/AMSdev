import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateApartment } from '../../services/apiApartments';

function useEditApartment(defaultId) {
  const queryClient = useQueryClient();

  const { mutate: editApartment, isPending } = useMutation({
    mutationFn: ([apartId, apartData]) => {
      const apartNum = defaultId !== undefined ? defaultId : apartId;
      console.log(apartId, apartData);
      return updateApartment(apartNum, apartData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartment'] });
      console.log('successfully updated apartment data');
    },
    onError: error => {
      console.log('Error updating apartment details', error);
    },
  });

  return { editApartment, isPending };
}

export default useEditApartment;
