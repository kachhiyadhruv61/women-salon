import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    address: "",
    pincode: "",
  });

  // ✅ FIX 1: errors state properly define
  const [errors, setErrors] = useState({});

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==========================
  // VALIDATION
  // ==========================
  const validate = () => {
    let err = {};

    if (!form.name.trim())
      err.name = "Name required";

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

    setErrors(err); // ✅ FIX 2: set errors
    return Object.keys(err).length === 0; // ✅ FIX 3: return true/false
  };


  // ==========================
  // REGISTER SUBMIT
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

     // 🔥 STEP 1: Terms check
  if (!agree) {
    alert("Please accept Terms & Conditions ⚠️");
    return;
  }


    const isValid = validate();
    if (!isValid) return;

    try {
      // ✅ FIX 4: Correct API URL (change if needed)
      const res = await fetch("http://localhost:5000/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Registration Successful ✅");

        setForm({
          name: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          gender: "",
          address: "",
          pincode: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } else {
        alert(data.message || "Registration Failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Register</h3>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
          <small className="error">{errors.name}</small>
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
          />
          <small className="error">{errors.username}</small>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
          <small className="error">{errors.email}</small>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
          <small className="error">{errors.phone}</small>
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
          <small className="error">{errors.password}</small>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label><br />
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={handleChange}
          /> Female
          <small className="error d-block">{errors.gender}</small>
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
          ></textarea>
          <small className="error">{errors.address}</small>
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            className="form-control"
            value={form.pincode}
            onChange={handleChange}
          />
          <small className="error">{errors.pincode}</small>
        </div>

        <div className="form-check mb-3">
  <input
    type="checkbox"
    className="form-check-input"
    id="termsCheck"
    checked={agree}
    onChange={(e) => setAgree(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="termsCheck">
    I agree to{" "}
    <Link to="/terms">Terms & Conditions</Link> and{" "}
    <Link to="/policies">Privacy Policy</Link>
  </label>
</div>
        
        <button type="submit" className="btn btn-primary w-100 mt-3"  disabled={!agree}>
          Register
        </button>

        <p className="note mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary fw-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;