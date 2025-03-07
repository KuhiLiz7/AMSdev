import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/transactions/payment';

const API_CALLBACK =
  'https://f19f-41-139-239-91.ngrok-free.app/api/v1/transactions/callback';

export async function payRent({ amount, tel }) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      amount: amount,
      phone: tel,
    },
    withCredentials: true,
  });

  return response;
}

export async function confirmPayment() {
  const response = await axios({
    method: 'post',
    url: `${API_CALLBACK}`,
    withCredentials: true,
  });

  console.log(response);

  return response;
}
