import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApartment } from '../../services/apiApartments';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useDeleteApartment(defaultApartNum) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: deleteApart, isPending } = useMutation({
    mutationFn: apartNum => {
      const numToDelete = apartNum !== undefined ? apartNum : defaultApartNum;
      if (!numToDelete) {
        throw new Error('Apartment Number is required!');
      }
      return deleteApartment(numToDelete);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartment'] });
      toast.success('deleted apartment successfully');
      navigate('/apartment', { replace: true });
    },
    onError: error => {
      console.log(error);
      toast.error(error.message);
    },
  });
  return { isPending, deleteApart };
}

export default useDeleteApartment;
