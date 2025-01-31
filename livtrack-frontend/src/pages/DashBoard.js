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
        <button onClick={() => navigate("/setting")}>⚙️ Settings</button>
      </div>
    </div>
  );
}
