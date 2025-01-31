import axios from "axios";
import { showNotification } from "@mantine/notifications";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

console.log(process.env.REACT_APP_API_URL);

export async function loginUser(credentials) {
  try {
    // Temporarily add this in your auth.js before the login request
    console.log("Attempting to reach backend at:", `${API_URL}/api/v1/auth`);

    // Add a healthcheck endpoint test
    axios
      .get(`${API_URL}/api/v1/auth/login`)
      .then((res) => console.log("Backend connection:", res.data))
      .catch((err) => console.error("Backend connection failed:", err));
    const response = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API URL:", API_URL);

    console.log("API Response:", response.data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token
      console.log("Stored token:", localStorage.getItem("token"));

      return response.data;
    }
  } catch (error) {
    console.error(
      "Login request failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// const API_URL = process.env.REACT_APP_API_URL;

// export const loginUser = async (credentials) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/api/v1/auth/login`,
//       credentials
//     );
//     return response.data;
//   } catch (error) {
//     showNotification({
//       title: "Login Failed",
//       message: error.response?.data?.message || "Server error",
//       color: "red",
//     });
//     throw error;
//   }
// };
