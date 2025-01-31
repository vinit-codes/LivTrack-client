// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import { fetchMetrics } from "../services/metrics";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
// import { Button, FileInput } from "@mantine/core";

// const API_URL = process.env.REACT_APP_API_URL;

// export default function Dashboard() {
//   const [metrics, setMetrics] = useState([]);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchMetrics();
//         setMetrics(data);
//       } catch (error) {
//         console.error("Failed to load metrics:", error);
//       }
//     };
//     loadData();
//   }, []);

//   const handleOCRUpload = async (file) => {
//     if (!file) return; // Ensure a file is selected

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(`${API_URL}/api/v1/ocr`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setMetrics((prevMetrics) => [...prevMetrics, response.data]); // Proper state update
//     } catch (error) {
//       console.error("OCR upload failed:", error);
//     }
//   };

//   return (
//     <div>
//       <Button onClick={logout} style={{ float: "right" }}>
//         Logout
//       </Button>
//       <h1>Health Dashboard</h1>

//       <FileInput
//         label="Upload Medical Report"
//         onChange={(file) => handleOCRUpload(file)}
//         accept=".pdf,.png,.jpg"
//       />

//       <LineChart width={600} height={300} data={metrics}>
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" />
//         <Line type="monotone" dataKey="glucose" stroke="#82ca9d" />
//       </LineChart>
//     </div>
//   );
// }
////////

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { fetchMetrics } from "../services/metrics";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../styles/dashBoard.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="dashboard-container">
      {/* User Info */}
      <div className="dashboard-header">
        <h1>Welcome to LivTrack</h1> {/* Replace dynamically with user data */}
        <Button onClick={logout} className="logout-button">
          Logout
        </Button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="dashboard-tile" onClick={() => navigate("/some-url")}>
          <img src="[UPLOAD YOUR PNG]" alt="Tile 1" />
          <p>Feature 1</p>
        </div>
        <div className="dashboard-tile" onClick={() => navigate("/some-url")}>
          <img src="[UPLOAD YOUR PNG]" alt="Tile 2" />
          <p>Feature 2</p>
        </div>
        <div className="dashboard-tile" onClick={() => navigate("/some-url")}>
          <img src="[UPLOAD YOUR PNG]" alt="Tile 3" />
          <p>Feature 3</p>
        </div>
        <div className="dashboard-tile" onClick={() => navigate("/some-url")}>
          <img src="[UPLOAD YOUR PNG]" alt="Tile 4" />
          <p>Feature 4</p>
        </div>
      </div>

      {/* Floating Scanner Button */}
      <button
        className="scanner-button"
        onClick={() => console.log("Open Camera Scanner")}
      >
        📷
      </button>

      {/* Bottom Navigation Bar */}
      <div className="bottom-navbar">
        <button onClick={() => navigate("/home")}>🏠 Home</button>
        <button onClick={() => navigate("/Profile")}>👤 Profile</button>
        <button onClick={() => navigate("/reports")}>📄 Reports</button>
        <button onClick={() => navigate("/settings")}>⚙️ Settings</button>
      </div>
    </div>
  );
}
