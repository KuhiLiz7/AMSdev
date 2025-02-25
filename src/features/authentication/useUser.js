import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../services/apiAuth';

function useUser() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  console.log(user);

  return { user };
}

export default useUser;
