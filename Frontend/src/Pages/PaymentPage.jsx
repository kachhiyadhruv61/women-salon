import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
 import { apiFetch } from "../utils/apiFetch";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [screenshot, setScreenshot] = useState(null);

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  if (!bookingData) {
    return <h3>No Booking Data Found</h3>;
  }

  const upiId = "womenorganic@okaxis";

  const upiLink = `upi://pay?pa=${upiId}&pn=WomenOrganicSalon&am=${bookingData.advanceAmount}&cu=INR`;

const handleConfirm = async () => {

  let isVerified = false;

  if (paymentMethod === "upi") {
    if (!screenshot) {
      alert("Upload screenshot");
      return;
    }
    isVerified = true;
  }

  if (paymentMethod === "card") {
    if (
      !cardDetails.number ||
      !cardDetails.name ||
      !cardDetails.expiry ||
      !cardDetails.cvv
    ) {
      alert("Fill card details");
      return;
    }
    isVerified = true;
  }

  if (paymentMethod === "cash") {
    isVerified = true;
  }

  const newBooking = {
    ...bookingData,
    paymentMethod,
    paymentVerified: isVerified,
    status: paymentMethod === "cash" ? "Confirmed" : "Pending",
  };

  try {
    const res = await apiFetch("/bookings", {
      method: "POST",
       headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(newBooking),
    });

    const data = await res.json();

    if (data.success) {
     if (data && data.success) {
      alert("Booking Successful ✅");
  navigate("/adbooking", {
    state: data.data,
  });
} else {
  console.log("API failed:", data);
  alert("Booking failed");
}
}
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Payment Page</h3>

        {/* Booking Info */}
        <div className="alert alert-info">
          <strong>Service:</strong> {bookingData.service} <br />
          <strong>Date:</strong> {bookingData.date} <br />
          <strong>Time:</strong> {bookingData.time} <br />
          <strong>Total:</strong> ₹{bookingData.totalAmount} <br />
          <strong>Advance:</strong> ₹{bookingData.advanceAmount}
        </div>

        {/* 🔘 Payment Options */}
        <h5>Select Payment Method</h5>

        <div className="mb-3">
          <input
            type="radio"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />{" "}
          UPI

          <br />

          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />{" "}
          Card

          <br />

          <input
            type="radio"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />{" "}
          Cash on Visit
        </div>

        {/* 🟣 UPI SECTION */}
        {paymentMethod === "upi" && (
          <div className="border p-3 rounded mb-3">
            <h6>Pay using UPI</h6>

            <div className="text-center mb-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  upiLink
                )}`}
                alt="QR"
              />
            </div>

            <p className="text-center">
              UPI ID: <strong>{upiId}</strong>
            </p>

            <a href={upiLink} className="btn btn-primary w-100 mb-2">
              Pay Now
            </a>

            <input
              type="file"
              className="form-control"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
          </div>
        )}

        {/* 🔵 CARD SECTION */}
        {paymentMethod === "card" && (
          <div className="border p-3 rounded mb-3">
            <h6>Enter Card Details</h6>

            <input
              type="text"
              placeholder="Card Number"
              className="form-control mb-2"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              className="form-control mb-2"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
            />

            <div className="d-flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="form-control"
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="CVV"
                className="form-control"
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* 🟢 CASH SECTION */}
        {paymentMethod === "cash" && (
          <div className="alert alert-warning">
            Pay remaining amount at salon during visit.
          </div>
        )}

        {/* ✅ Confirm Button */}
        <button className="btn btn-success w-100" onClick={handleConfirm}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;