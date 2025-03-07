import { useMutation } from '@tanstack/react-query';
import { confirmPayment } from '../../services/apiPayment';

function ConfirmPaid() {
  const { mutate: confirmPay, isPending } = useMutation({
    mutationFn: confirmPayment,
    onSuccess: response => {
      console.log(response);
    },
    onError: err => {
      console.log(err);
    },
  });

  return { confirmPay, isPending };
}

export default ConfirmPaid;
