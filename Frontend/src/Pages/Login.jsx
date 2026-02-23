import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Login page open thay tyare form always clean rahe
  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    let userRole = null;
    let redirectPath = "/login";

    // 🔐 Admin
    if (username === "admin" && password === "admin123") {
      userRole = "admin";
      redirectPath = "/dashboard";
    }

    // 👤 User
    else if (username === "user" && password === "user123") {
      userRole = "user";
      redirectPath = "/userdashboard";
    }

    // 👨‍💼 Staff
    else if (username === "staff" && password === "staff123456") {
      userRole = "staff";
      redirectPath = "/staff/dashboard";
    }

    else {
      setError("Invalid username or password");
      return;
    }

    // ✅ Save role in localStorage
    localStorage.setItem("role", userRole);

    // ✅ Update App state
    setRole(userRole);

    // ✅ Clear form before redirect
    setUsername("");
    setPassword("");

    // ✅ Navigate
    navigate(redirectPath);
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
            autoComplete="off"
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
            autoComplete="new-password"
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
         
        </p>
      </form>
    </div>
  );
};

export default Login;