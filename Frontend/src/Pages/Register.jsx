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
    gender: "",
    address: "",
    pincode: "",
     otp: "",          // email OTP
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

  if (!form.username.trim())
    err.username = "Username required";

  if (!form.email.trim())
    err.email = "Email required";

  if (!form.phone.trim())
    err.phone = "Phone required";
  else if (!/^[0-9]{10}$/.test(form.phone))
    err.phone = "Enter valid 10 digit phone";

  if (!form.password.trim())
    err.password = "Password required";
  else if (form.password.length < 6)
    err.password = "Minimum 6 characters required";

  if (!form.gender)
    err.gender = "Select gender";

  if (!form.address.trim())
    err.address = "Address required";

  if (!form.pincode.trim())
    err.pincode = "Pincode required";
  else if (!/^[0-9]{6}$/.test(form.pincode))
    err.pincode = "Enter valid 6 digit pincode";

  /* EMAIL OTP CHECK */
  if (!form.otp.trim()) {
    err.otp = "OTP required";
  } else {
    const res = await fetch("http://localhost:5000/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
  email: form.email,
  otp: form.otp 
})
    });

    const data = await res.json();
    if (!data.success) err.otp = "Incorrect email OTP";
  }

 

  setErrors(err);
  return Object.keys(err).length === 0;
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = await validate();   // 🔥 await jaruri che
  if (!isValid) return;

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