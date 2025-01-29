import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button } from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      login(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
