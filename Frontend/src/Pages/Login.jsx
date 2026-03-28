import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setRole }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      // ❌ login failed
      if (!data.success) {
        setError(data.message || "Invalid username or password");
        return;
      }

      // ✅ FIXED USER SAVE (IMPORTANT)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user?.name || username   // 👈 MAIN FIX
        })
      );

      // tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // role
      const role = data.user?.role || "user";
      localStorage.setItem("role", role);

      setRole(role);

      // redirect
      if (role === "admin") {
        navigate("/dashboard");
      } 
      else if (role === "staff") {
        navigate("/staff/dashboard");
      } 
      else {
        navigate("/userdashboard");
      }

    } catch (err) {
      console.log(err);
      setError("Server error. Please try again.");
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
          Admin → admin / admin123
        </p>

      </form>

    </div>
  );
};

export default Login;