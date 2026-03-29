import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await apiFetch("/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  email,
  otp: otp.toString(), // 🔥 important
}),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified ✅");

        // 👉 Login page redirect
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h3>Verify OTP</h3>

      <input
        type="text"
        placeholder="Enter 4 Digit OTP"
        className="form-control w-50 mx-auto mb-3"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleVerify}>
        Verify OTP
      </button>
    </div>
  );
}

export default VerifyOTP;