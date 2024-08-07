// /src/api/recovery.js
import axios from './axios';

export const forgotPasswordRequest = (email) => {
  return axios.post('/forgot-password', { email });
};

export const verifyCodeRequest = (email, code, userData) => {
  return axios.post('/verify-code', { email, code, userData });
};

export const resetPasswordRequest = (email, newPassword) => {
  return axios.post('/reset-password', { email, newPassword });
};

export const sendVerificationCodeRequest = (email) => {
  return axios.post('/send-verification-code', { email });
};

export const sendSupportEmailRequest = (email, subject, message) => {
  return axios.post('/send-support-email', { email, subject, message });
};

export const sendVerificateTransactionCodeRequest = (email, code) => {
  return axios.post('/send-verificate-transaction-code', { email, code });
};
