import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Card,
  Title,
  PasswordInput,
  Alert,
} from "@mantine/core";
import axios from "axios"; // Import axios for API requests
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login/Register
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (isRegister) {
        // Register user
        const response = await axios.post("http://localhost:8000/api/v1/auth/register", {
          email,
          password,
        });

        if (response.data) {
          setSuccess("Registration successful! You can now log in.");
          setIsRegister(false); // Switch back to login mode
        }
      } else {
        // Login user
        const userData = await loginUser({ email, password });

        if (!userData || !userData.token) {
          setError("Invalid credentials. Please try again.");
          return;
        }

        login(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <Card shadow="lg" padding="xl" radius="md" className="login-card">
        <Title align="center" order={2} className="login-title">
          {isRegister ? "Create an Account" : "Login to Your Account"}
        </Title>

        {error && (
          <Alert color="red" title="Error" className="error-alert">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" title="Success" className="success-alert">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextInput
            className="login-input"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <PasswordInput
            className="login-input"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <Button type="submit" fullWidth className="login-button">
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>

        <Button
          fullWidth
          variant="outline"
          className="register-button"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Back to Login" : "Register"}
        </Button>
      </Card>
    </div>
  );
}
