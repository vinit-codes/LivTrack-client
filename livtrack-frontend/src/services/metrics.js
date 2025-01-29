import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchMetrics = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/api/metrics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
