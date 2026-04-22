import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const BASE_URL = "http://localhost:5000";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, form);

      console.log(res.data);

      if (!res.data.token) {
        alert("No token received");
        return;
      }

      localStorage.setItem("token", res.data.token);

      // 🔥 Force redirect (no router bug)
      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>

      <p>
  New user? <Link to="/register" className="auth-link">Register</Link>
</p>
    </div>
  );
}

export default Login;