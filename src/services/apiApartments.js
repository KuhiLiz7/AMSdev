import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/apartments';
const API_URL = 'http://localhost:8000/api/v1/apartments';

export async function getAllApartments() {
  const response = await axios({
    method: 'get',
    url: `${API_URL}`,
    withCredentials: true,
  });

  return response.data?.data;
}

export async function getApartment(apartNum) {
  console.log(apartNum);
  const response = await axios({
    method: 'get',
    url: `${API_URL}/${apartNum}`,
  });

  return response.data?.data.data;
}

export async function createApartment(data) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      name: data.name,
      location: data.location,
      floors: data.floors,
      units: data.units,
      apartmentType: data.apartmentType,
      description: data.description,
      photo: data.photo[0],
    },
  });

  return response.data;
}

export async function deleteApartment(apartNum) {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}/${apartNum}`,
  });

  return response;
}

export async function updateApartment(apartNum, apartData) {
  const photo = apartData.photo[0];
  const formData = { ...apartData, photo };

  const response = await axios({
    method: 'patch',
    url: `${API_URL}/${apartNum}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return response;
}
