// /src/api/user.js
import axios from './axios';

export const getUserDataRequest = (userId) => {
  return axios.get(`/user/data/${userId}`);
};

export const updateUserDataRequest = (userId, data) => {
  return axios.put(`/user/data/${userId}`, data);
};

export const changePasswordRequest = (data) => {
    return axios.post('/user/change-password', data);
  };
  

