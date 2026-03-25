import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [setScreenshot] = useState(null);

  if (!bookingData) {
    return <h3>No Booking Data Found</h3>;
  }

  const upiId = "womenorganic@okaxis";

  const upiLink = `upi://pay?pa=${upiId}&pn=WomenOrganicSalon&am=${bookingData.advanceAmount}&cu=INR`;


const handleConfirm = async () => {
    try {
      // ✅ STEP 1: CREATE BOOKING
      const bookingRes = await apiFetch("/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: bookingData.name,
          service: bookingData.service,
          date: bookingData.date,
          time: bookingData.time,
          amount: Number(bookingData.totalAmount),
          advanceAmount: Number(bookingData.advanceAmount),
          paymentMethod: paymentMethod,
        }),
      });

      const bookingResult = await bookingRes.json();

      if (!bookingResult.success) {
        alert("Booking failed");
        return;
      }

      const bookingId = bookingResult.bookingId;

      // ✅ STEP 2: STORE BOOKING PAYMENT
      await apiFetch("/bookingpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          userName: bookingData.name,
          contact: bookingData.contact || "",
          service: bookingData.service,
          amount: bookingData.advanceAmount,
          paymentMethod: paymentMethod,
          paymentStatus:
            paymentMethod === "cash" ? "Pending" : "Created",
        }),
      });

      // 🟢 CASH
      if (paymentMethod === "cash") {
        alert("Booking Confirmed (Cash)");
        navigate("/adbooking");
      }

      // 🔥 RAZORPAY
      else if (paymentMethod === "razorpay") {
        const bookpay = bookingResult.razorpayOrder;

        if (!bookpay) {
          alert("booking not created");
          return;
        }

        const options = {
          key: "rzp_test_SU9OILjNd5mGst",
          bookpay_id: bookpay.id,
          amount: bookpay.amount,
          currency: "INR",

          handler: async function (response) {
            const verifyRes = await apiFetch("/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful ✅");
              navigate("/adbooking");
            } else {
              alert("Payment Failed ❌");
            }
          },
        };

      const rzp = new window.Razorpay(options);
      rzp.open();
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

        {/* Payment Options */}
        <h5>Select Payment Method</h5>

        <div className="mb-3">
          <input
            type="radio"
            checked={paymentMethod === "razorpay"}
            onChange={() => setPaymentMethod("razorpay")}
          /> Razorpay (UPI/Card)

          <br />

          <input
            type="radio"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          /> UPI (Manual)

          <br />

          <input
            type="radio"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          /> Cash on Visit
        </div>

        {/* UPI Manual */}
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

        {/* Cash */}
        {paymentMethod === "cash" && (
          <div className="alert alert-warning">
            Pay remaining amount at salon during visit.
          </div>
        )}

        {/* Confirm Button */}
        <button className="btn btn-success w-100" onClick={handleConfirm}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;