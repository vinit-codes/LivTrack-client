import axios from "axios";
import { showNotification } from "@mantine/notifications";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    showNotification({
      title: "Login Failed",
      message: error.response?.data?.message || "Server error",
      color: "red",
    });
    throw error;
  }
};
