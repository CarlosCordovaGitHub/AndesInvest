import React, { createContext, useContext, useState } from "react";
import {
  forgotPasswordRequest,
  verifyCodeRequest,
  resetPasswordRequest,
  sendVerificationCodeRequest,
  sendSupportEmailRequest,
  sendVerificateTransactionCodeRequest
} from "../api/recovery.js";

const RecoveryContext = createContext();

export const useRecovery = () => {
  const context = useContext(RecoveryContext);
  if (!context) throw new Error("useRecovery must be used within a RecoveryProvider");
  return context;
};

export const RecoveryProvider = ({ children }) => {
  const [recoveryData, setRecoveryData] = useState(null);

  const forgotPassword = async (email) => {
    try {
      const response = await forgotPasswordRequest(email);
      setRecoveryData(response.data);
      return response;
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      throw error;
    }
  };

  const verifyCode = async (email, code, userData) => {
    try {
      const response = await verifyCodeRequest(email, code, userData);
      setRecoveryData(response.data);
      return response;
    } catch (error) {
      console.error("Error verifying code:", error);
      throw error;
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      const response = await resetPasswordRequest(email, newPassword);
      setRecoveryData(response.data);
      return response;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  const sendVerificationCode = async (email) => {
    try {
      const response = await sendVerificationCodeRequest(email);
      setRecoveryData(response.data);
      return response;
    } catch (error) {
      console.error("Error sending verification code:", error);
      throw error;
    }
  };

  const sendSupportEmail = async (email, subject, message) => {
    try {
      const response = await sendSupportEmailRequest(email, subject, message);
      setRecoveryData(response.data);
      return response;
    } catch (error) {
      console.error("Error sending support email:", error);
      throw error;
    }
  };

  const sendVerificateTransactionCode = async (email, code) => {
    try {
      const response = await sendVerificateTransactionCodeRequest(email, code);
      setRecoveryData(response.data);
      return response;
    } catch (error) {
      console.error("Error sending verificate transaction code:", error);
      throw error;
    }
  };

  return (
    <RecoveryContext.Provider value={{
      recoveryData,
      forgotPassword,
      verifyCode,
      resetPassword,
      sendVerificationCode,
      sendSupportEmail,
      sendVerificateTransactionCode
    }}>
      {children}
    </RecoveryContext.Provider>
  );
};
