import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/users';
const API_URL = 'http://localhost:8000/api/v1/users';

export async function createUser(userData) {
  console.log(userData);
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      email: userData.email,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm,
    },
    withCredentials: true,
  });

  console.log(response);
  return response;
}

export async function getAllUsers() {
  const response = await axios({
    method: 'get',
    url: `${API_URL}`,
    withCredentials: true,
  });

  console.log(response);

  return response.data?.data.data;
}
