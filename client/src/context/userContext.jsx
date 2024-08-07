import React, { createContext, useContext, useState } from "react";
import { getUserDataRequest, updateUserDataRequest, changePasswordRequest } from "../api/user.js";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await getUserDataRequest(userId);
      setUserData(response.data);
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const updateUserData = async (userId, data) => {
    try {
      const response = await updateUserDataRequest(userId, data);
      setUserData(response.data);
      return response;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword, userId) => {
    try {
      const response = await changePasswordRequest({ currentPassword, newPassword, userId });
      return response;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ userData, fetchUserData, updateUserData, changePassword }}>
      {children}
    </UserContext.Provider>
  );
};
