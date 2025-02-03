import { useState } from "react";
import "../styles/login.css"; // Make sure to update the CSS accordingly
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Card,
  Title,
  PasswordInput,
  Alert,
  Loader,
} from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";
import logo from "../styles/LOGO.png"; // Import the logo correctly

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new attempt
    setLoading(true); // Set loading to true

    try {
      const userData = await loginUser({
        email: email,
        password: password,
      });

      if (!userData || !userData.token) {
        setError("Invalid credentials. Please try again.");
        setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
        return;
      }

      login(userData);
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please check your email or password.");
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <Card
        shadow="xl"
        padding="xl"
        radius="md"
        className="login-card"
        withBorder
      >
        {/* Logo Section */}
        <div className="logo-container">
          <img
            src={logo} // Use the imported logo
            alt="Logo"
            className="login-logo"
            style={{ width: "200px", height: "200px" }} // Increase logo size here
          />
        </div>

        <Title align="center" order={2} className="login-title">
          Login to Your Account
        </Title>

        {error && (
          <Alert color="red" title="Error" className="error-alert">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextInput
            className="login-input"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="                   ENTER  YOUR EMAIL ID"
            radius="md"
          />
          <PasswordInput
            className="login-input"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="                ENTER   YOUR   PASSWORD"
            radius="md"
          />
          <Button
            type="submit"
            fullWidth
            className="login-button"
            radius="md"
            disabled={loading} // Disable button when loading
          >
            {loading ? <Loader size="sm" color="white" /> : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}