import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";
const BASE_URL = "https://student-registration-18y7.onrender.com";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleRegister = async () => {
  const { name, email, password, course } = form;

  // 🔴 Check empty fields
  if (!name || !email || !password || !course) {
    alert("Please fill all fields");
    return;
  }

  // 🔴 Email validation (better than just "@")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Enter a valid email");
    return;
  }

  // 🔴 Password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    await axios.post(`${BASE_URL}/api/register`, form);
    alert("Registered Successfully");
    window.location.href = "/#/";
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input
  type="email"
  placeholder="Email"
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Course" onChange={(e) => setForm({ ...form, course: e.target.value })} />

      <button type="button" onClick={handleRegister}>
        Register
      </button>

      <p>
  Already have account? <Link to="/" className="auth-link">Login</Link>
</p>
    </div>
  );
}

export default Register;