import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    status: "active",
    gender: "",
    address: "",
    pincode: "",
     otp: "",          // email OTP
  manualOtp: ""     // 🔥 new manual OTP
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
  if (!form.email) {
    alert("Enter email first");
    return;
  }

  const res = await fetch("http://localhost:5000/api/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: form.email })
  });

  const data = await res.json();
  if (data.success) {
    alert("OTP sent to your email 📧");
  }
};
const validate = async () => {
  let err = {};

  if (!form.username) err.username = "Username required";

  /* EMAIL OTP VERIFY (backend) */
  const res = await fetch("http://localhost:5000/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp: form.otp })
  });

  const data = await res.json();
  if (!data.success) err.otp = "Incorrect email OTP";

  /* 🔥 MANUAL OTP LOGIC */
  if (form.role === "staff") {
    if (form.manualOtp !== "STAFF2024") {
      err.manualOtp = "Invalid staff OTP";
    }
  }

  setErrors(err);
  return Object.keys(err).length === 0;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Registered Successfully ✅");
    console.log(form);
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">
          <i className="bi bi-person-plus"></i> Register
        </h3>

        {/* Username */}
        <div className="form-group">
          <label><i className="bi bi-person"></i> Username</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} />
          <small className="error">{errors.username}</small>
        </div>

        {/* Email */}
        <div className="form-group">
          <label><i className="bi bi-envelope"></i> Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} />
          <button type="button" className="btn btn-sm btn-secondary mt-2" onClick={sendOtp}>
            Send OTP
          </button>
          <small className="error">{errors.email}</small>
        </div>

        {/* OTP */}
        <div className="form-group">
          <label><i className="bi bi-shield-lock"></i> Email OTP</label>
          <input type="text" name="otp" className="form-control" onChange={handleChange} />
          <small className="error">{errors.otp}</small>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label><i className="bi bi-telephone"></i> Phone</label>
          <input type="text" name="phone" className="form-control" onChange={handleChange} />
          <small className="error">{errors.phone}</small>
        </div>

        {/* Password */}
        <div className="form-group">
          <label><i className="bi bi-lock"></i> Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} />
          <small className="error">{errors.password}</small>
        </div>

        {/* Role */}
        <div className="form-group">
          <label><i className="bi bi-person-badge"></i> Role</label>
          <select name="role" className="form-control" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Status */}
        <div className="form-group">
          <label><i className="bi bi-toggle-on"></i> Status</label>
          <select name="status" className="form-control" onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label><i className="bi bi-gender-ambiguous"></i> Gender</label><br />
          <input type="radio" name="gender" value="male" onChange={handleChange} /> Male &nbsp;
          <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
          <small className="error d-block">{errors.gender}</small>
        </div>

        {/* Address */}
        <div className="form-group">
          <label><i className="bi bi-geo-alt"></i> Address</label>
          <textarea name="address" className="form-control" onChange={handleChange}></textarea>
          <small className="error">{errors.address}</small>
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label><i className="bi bi-mailbox"></i> Pincode</label>
          <input type="text" name="pincode" className="form-control" onChange={handleChange} />
          <small className="error">{errors.pincode}</small>
        </div>

        {/* Manual OTP */}
<div className="form-group">
  <label>
    <i className="bi bi-key"></i> Manual OTP / Staff Code
  </label>
  <input
    type="text"
    name="manualOtp"
    className="form-control"
    placeholder="Enter manual OTP"
    onChange={handleChange}
  />
  <small className="error">{errors.manualOtp}</small>
</div>


        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>

        <p className="note">Already have an account? {" "}
          <Link to ="/login" className="text-primary fw-bold">
          Login
          </Link></p>
        
      </form>
    </div>
  );
};

export default Register;