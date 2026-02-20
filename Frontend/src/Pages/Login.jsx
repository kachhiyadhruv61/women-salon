import { useState } from "react";
import {  Link,useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      setRole("admin");
      navigate("/dashboard");
    } 
    else if (username === "user" && password === "user123") {
      localStorage.setItem("role", "user");
      setRole("user");
      navigate("/userdashboard");
    } 
    else if (username === "staff" && password === "staff123456") {
      localStorage.setItem("role", "staff");
      setRole("staff");
      navigate("/staff/dashboard");
    } 
    else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="mt-3 text-center">
          New user? <Link to="/register">Register here</Link>
        </p>

        <p className="note">
          Admin → admin / admin123 <br />
          User → user / user123 <br />
          Staff → staff / staff123456
        </p>
      </form>
    </div>
  );
};

export default Login;