import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
const BASE_URL = "https://student-registration-18y7.onrender.com";

function Dashboard() {
  const [student, setStudent] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showCourse, setShowCourse] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [course, setCourse] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!token) {
      window.location.href = "/#/";
      return;
    }

    axios
      .get(`${BASE_URL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setStudent(res.data.student))
      .catch(() => {
        alert("Session expired");
        localStorage.removeItem("token");
        window.location.href = "/#/";
      });
  }, []);

  /* ================= UPDATE PASSWORD ================= */
  const updatePassword = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/update-password`,
        passwords,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password updated");
      setPasswords({ oldPassword: "", newPassword: "" });
      setShowPassword(false);

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  /* ================= UPDATE COURSE ================= */
  const updateCourse = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/update-course`,
        { course },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudent(res.data.student);
      setCourse("");
      setShowCourse(false);

      alert("Course updated");

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/#/";
  };

  if (!student) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* ===== Student Info ===== */}
      <p><b>Name:</b> {student.name}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Course:</b> {student.course}</p>

      {/* ===== Separate Buttons ===== */}
      <button
  onClick={() => {
    setShowPassword(true);
    setShowCourse(false); // 👈 close course form
  }}
>
  Update Password
</button>

      <button
  onClick={() => {
  setShowCourse(!showCourse);
  setShowPassword(false);
}}
>
  Change Course
</button>

      {/* ===== Password Form ===== */}
      {showPassword && (
  <div className="form-section">
    <h3>Update Password</h3>

    <input
      type="password"
      placeholder="Old Password"
      value={passwords.oldPassword}
      onChange={(e) =>
        setPasswords({ ...passwords, oldPassword: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="New Password"
      value={passwords.newPassword}
      onChange={(e) =>
        setPasswords({ ...passwords, newPassword: e.target.value })
      }
    />

    <button onClick={updatePassword}>Submit</button>
    <button onClick={() => setShowPassword(false)}>Cancel</button>
  </div>
)}

      {/* ===== Course Form ===== */}
      {showCourse && (
  <div className="form-section">
    <h3>Change Course</h3>

    <input
      placeholder="New Course"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
    />

    <button onClick={updateCourse}>Submit</button>
    <button onClick={() => setShowCourse(false)}>Cancel</button>
  </div>
)}

      {/* ===== Logout ===== */}
      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;