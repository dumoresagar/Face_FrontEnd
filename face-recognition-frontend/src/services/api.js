import axios from 'axios';

const API_URL = "https://b994-2402-e280-3e52-4e4-791b-b24f-3054-9602.ngrok-free.app/api/version_0/authentication/recognize/";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('API call failed');
  }
};
