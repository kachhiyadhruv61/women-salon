import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [screenshot, setScreenshot] = useState(null);

  if (!bookingData) {
    return <h3>No Booking Data Found</h3>;
  }

  const upiId = "womenorganic@okaxis";

  const upiLink = `upi://pay?pa=${upiId}&pn=WomenOrganicSalon&am=${bookingData.advanceAmount}&cu=INR`;

  const handleConfirm = () => {

  // 1️⃣ Screenshot required
  if (!screenshot) {
    alert("Please upload payment screenshot after paying");
    return;
  }

  // 2️⃣ File type validation
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(screenshot.type)) {
    alert("Only JPG or PNG images allowed");
    return;
  }

  // 3️⃣ File size validation (max 2MB)
  if (screenshot.size > 2 * 1024 * 1024) {
    alert("Image size must be less than 2MB");
    return;
  }

  // 🔥 Mark payment as verified locally
  const updatedData = {
    ...bookingData,
    paymentVerified: true,
  };

  navigate("/booking-success", {
    state: updatedData,
  });
};

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Payment Page</h3>

        <div className="alert alert-info">
          <strong>Service:</strong> {bookingData.service} <br />
          <strong>Date:</strong> {bookingData.date} <br />
          <strong>Time:</strong> {bookingData.time} <br />
          <strong>Total:</strong> ₹{bookingData.totalAmount} <br />
          <strong>Advance (50%):</strong> ₹{bookingData.advanceAmount} <br />
          <strong>Remaining:</strong> ₹{bookingData.remainingAmount}
        </div>

        <div className="text-center mb-3">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              upiLink
            )}`}
            alt="QR Code"
          />
        </div>

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setScreenshot(e.target.files[0])}
        />

        <button
          className="btn btn-success w-100"
          onClick={handleConfirm}
        >
          Verify & Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;