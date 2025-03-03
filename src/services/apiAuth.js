import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/users';
const API_URL = 'http://localhost:8000/api/v1/users';

export async function login({ email, password }) {
  const response = await axios({
    method: 'POST',
    url: `${API_URL}/login`,
    data: {
      email,
      password,
    },
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  console.log(response.data.data.user);

  return response.data.data;
}

export async function logout() {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/logout`,
  });

  return response;
}

export async function getUser() {
  const user = await axios({
    method: 'get',
    url: `${API_URL}/me`,
    withCredentials: true,
  });

  console.log(user);

  return user?.data?.user || null;
}
