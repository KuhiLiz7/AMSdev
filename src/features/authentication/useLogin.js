// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { login as LoginApi } from './../../services/apiAuth';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export function useLogin() {
//   /**Create a query client */
// const queryClient = useQueryClient();

//   const navigate = useNavigate();

//   const {
//     mutate: login,
//     isPending,
//     isSuccess,
//     error,
//   } = useMutation({
//     mutationFn: ({ email, password }) => LoginApi({ email, password }),
//     onSuccess: user => {
//       queryClient.setQueryData(['user'], user.data);

//       toast.success('Successfully logged in!');
//       navigate('/', { replace: true });
//     },
//     onError: err => {
//       console.log(err);
//       if (err.code === 'ERR_NETWORK') {
//         toast.error(err.message);
//       }
//       toast.error(err.response.data.message);
//     },
//   });

//   return { login, isPending, isSuccess, error };
// }

function useLogin() {
  return <div></div>;
}

export default useLogin;
