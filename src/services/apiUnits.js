import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/v1/units';
const API_URL = 'http://localhost:8000/api/v1/units';

export async function getAllUnits() {
  const response = await axios({
    method: 'get',
    url: `${API_URL}`,
  });

  return response.data?.data;
}
export async function deleteUnit(unitId) {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}/${unitId}`,
    data: {
      id: unitId,
    },
    withCredentials: true,
  });

  console.log(response);

  return response;
}

export async function createUnit(unitData) {
  const response = await axios({
    method: 'post',
    url: `${API_URL}`,
    data: {
      unitType: unitData.unitType,
      apartmentUnit: unitData.apartmentUnit,
      unitNum: unitData.unitNum,
      floor: unitData.floor,
      status: unitData.status,
      description: unitData.description,
    },
    withCredentials: true,
  });

  return response;
}
