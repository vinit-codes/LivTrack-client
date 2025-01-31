import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { fetchMetrics } from "../services/metrics";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Button, FileInput } from "@mantine/core";

const API_URL = process.env.REACT_APP_API_URL;

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to load metrics:", error);
      }
    };
    loadData();
  }, []);

  const handleOCRUpload = async (file) => {
    if (!file) return; // Ensure a file is selected

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/api/v1/ocr`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMetrics((prevMetrics) => [...prevMetrics, response.data]); // Proper state update
    } catch (error) {
      console.error("OCR upload failed:", error);
    }
  };

  return (
    <div>
      <Button onClick={logout} style={{ float: "right" }}>
        Logout
      </Button>
      <h1>Health Dashboard</h1>

      <FileInput
        label="Upload Medical Report"
        onChange={(file) => handleOCRUpload(file)}
        accept=".pdf,.png,.jpg"
      />

      <LineChart width={600} height={300} data={metrics}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" />
        <Line type="monotone" dataKey="glucose" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
