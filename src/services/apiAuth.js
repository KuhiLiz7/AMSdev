import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/users';

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
  console.log(response);
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
}

export async function logout() {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_URL}/logout`,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getUser() {
  try {
    const user = await axios({
      method: 'get',
      url: `${API_URL}/me`,
      withCredentials: true,
    });

    return user?.data || null;
  } catch (err) {
    console.log(err);
  }
}
