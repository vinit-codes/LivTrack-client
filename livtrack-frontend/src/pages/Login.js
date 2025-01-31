import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Card,
  Title,
  PasswordInput,
  Alert,
} from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", email, password);
    setError(null); // Reset error on new attempt

    try {
      // const userData = await loginUser({ email, password });

      // Use actual form values instead of hardcoded credentials
      const userData = await loginUser({
        email: email,
        password: password,
      });
      console.log("Received User Data:", userData);

      if (!userData || !userData.token) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      login(userData);
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card shadow="lg" padding="xl" radius="md" style={{ width: 400 }}>
        <Title align="center" order={2} style={{ marginBottom: "1rem" }}>
          Login to Your Account
        </Title>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={{ marginBottom: "1rem" }}
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={{ marginBottom: "1rem" }}
          />
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
