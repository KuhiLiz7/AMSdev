import { useMutation } from '@tanstack/react-query';
import { payRent } from '../../services/apiPayment';
import toast from 'react-hot-toast';

function UsePayrent() {
  const { mutate: payrent, isPending } = useMutation({
    mutationFn: ({ amount, tel }) => {
      console.log(amount, tel);
      return payRent({ amount, tel });
    },
    onSuccess: response => {
      console.log(response);
      console.log('Rent paid', response.data.data);
      if (response.status === 400) {
        throw new Error(response.data.message);
      }
      toast.success(`${response.data.data}`);
    },
    onError: err => {
      console.log(err);
      toast.error(err.data.data);
    },
  });

  return { payrent, isPending };
}
export default UsePayrent;
