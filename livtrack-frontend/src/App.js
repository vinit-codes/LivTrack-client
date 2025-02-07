import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reports from "./pages/reports";
import Dashboard from "./pages/DashBoard";
import Settings from "./pages/setting";
import CholesterolMetrics from "./pages/CholesterolMetrics";
import EyeMetics from "./pages/eyeMetrics";
import PcosMetrics from "./pages/pcosMetrics";
import BloodMetics from "./pages/bloodMetrics";
import CholesterolGraph from "./pages/cholesterolGraph";
<<<<<<< HEAD
import PCOSGraphs from "./pages/pcosGraphs";

=======
import Hospital from "./pages/hospital";
>>>>>>> 07ea07d2d0b3f3a01dab8ec77f5bd62240c97247
function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cholesterol-metrics"
              element={
                <ProtectedRoute>
                  <CholesterolMetrics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eye-metrics"
              element={
                <ProtectedRoute>
                  <EyeMetics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pcos-metrics"
              element={
                <ProtectedRoute>
                  <PcosMetrics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blood-metrics"
              element={
                <ProtectedRoute>
                  <BloodMetics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cholesterol-graph"
              element={
                <ProtectedRoute>
                  <CholesterolGraph />
                </ProtectedRoute>
              }
            />
            <Route
<<<<<<< HEAD
              path="/pcos-graph"
              element={
                <ProtectedRoute>
                  <PCOSGraphs />
=======
              path="/hospital-details"
              element={
                <ProtectedRoute>
                  <Hospital />
>>>>>>> 07ea07d2d0b3f3a01dab8ec77f5bd62240c97247
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}
export default App;
