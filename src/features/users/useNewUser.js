import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../services/apiUser';

function useNewUser() {
  const { mutate: newUser, isPending } = useMutation({
    mutationFn: userData => createUser(userData),
    onSuccess: () => {
      console.log('new user successfully created');
    },
    onError: error => {
      console.log('failed creating new user!', error);
    },
  });

  return { newUser, isPending };
}

export default useNewUser;
