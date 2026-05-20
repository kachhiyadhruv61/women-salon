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
      console.log("📦 Creating booking...", bookingData);

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
      console.log("✅ Booking Result:", bookingResult);

      if (!bookingResult.success) {
        console.error("❌ Booking Failed:", bookingResult);
        alert("❌ Booking failed: " + (bookingResult.message || "Unknown error"));
        return;
      }

      const bookingId = bookingResult.bookingId;
      console.log("📝 Booking ID:", bookingId);

      // ✅ STEP 2: STORE BOOKING PAYMENT
      const payRes = await apiFetch("/bookingpay", {
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

      const paymentStored = await payRes.json();
      console.log("💳 Payment Stored:", paymentStored);

      // 🟢 CASH
      if (paymentMethod === "cash") {
        alert("✅ Booking Confirmed (Cash Payment)");
        navigate("/adbooking");
        return;
      }

      // 🔥 RAZORPAY
      else if (paymentMethod === "razorpay") {
        const razorpayOrder = bookingResult.razorpayBook;

        if (!razorpayOrder) {
          console.error("❌ Razorpay Order not created");
          alert("❌ Razorpay order creation failed");
          return;
        }

        console.log("💰 Opening Razorpay with Order ID:", razorpayOrder.id);

        const options = {
          key: "rzp_test_SU9OILjNd5mGst",
          order_id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "A² Women Organic Salon",
          description: `Service Booking: ${bookingData.service}`,

          handler: async function (response) {
            console.log("💳 Payment Response:", response);

            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
              amount: bookingData.advanceAmount,
            };

            console.log("🔐 Verifying payment...");

            try {
              const verifyRes = await apiFetch("/verify-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(verificationData),
              });

              const verifyData = await verifyRes.json();
              console.log("✅ Verification Response:", verifyData);

              if (verifyData.success) {
                alert("✅ Payment Successful! Your booking is confirmed.");
                navigate("/adbooking");
              } else {
                alert("❌ Payment verification failed: " + (verifyData.message || "Unknown error"));
              }
            } catch (verifyErr) {
              console.error("❌ Verification Error:", verifyErr);
              alert("❌ Error verifying payment: " + verifyErr.message);
            }
          },

          prefill: {
            name: bookingData.name,
            email: localStorage.getItem("userEmail") || "kachhiyadhruv61@gmail.com",
            contact: bookingData.contact || "",
          },

          theme: {
            color: "#bf9456",
          },

          modal: {
            ondismiss: function () {
              console.log("⚠️ Payment modal dismissed");
              alert("⚠️ Payment cancelled by user");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }

  } catch (error) {
    console.error("❌ Error:", error);
    alert("❌ Server error: " + (error.message || "Unknown error"));
  }
};

  return (
    <div style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh",
      paddingTop: "30px",
      paddingBottom: "50px"
    }}>
      <div className="container" style={{ maxWidth: "500px" }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "30px"
        }}>
          <h2 style={{
            color: "#bf9456",
            fontWeight: "700",
            marginBottom: "10px",
            fontSize: "28px"
          }}>
            💳 Complete Your Booking
          </h2>
          <p style={{ color: "#666", fontSize: "14px" }}>Secure payment for your salon appointment</p>
        </div>

        {/* Main Card */}
        <div style={{
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          padding: "30px",
          marginBottom: "20px"
        }}>

          {/* Booking Info Card */}
          <div style={{
            background: "linear-gradient(135deg, #fef5e7 0%, #fde8d4 100%)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "25px",
            borderLeft: "4px solid #bf9456"
          }}>
            <h5 style={{ color: "#bf9456", marginBottom: "15px", fontWeight: "600" }}>
              📋 Booking Summary
            </h5>
            
            <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Service:</span>
                <span style={{ fontWeight: "600", color: "#333" }}>{bookingData.service}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Date:</span>
                <span style={{ fontWeight: "600", color: "#333" }}>{bookingData.date}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Time:</span>
                <span style={{ fontWeight: "600", color: "#333" }}>{bookingData.time}</span>
              </div>
              <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #d4af9f" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#666" }}>Total Amount:</span>
                <span style={{ fontWeight: "600", color: "#333" }}>₹{bookingData.totalAmount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", background: "#bf9456", color: "white", padding: "8px 12px", borderRadius: "6px", marginTop: "5px" }}>
                <span>Advance Payment:</span>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>₹{bookingData.advanceAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <h5 style={{ color: "#333", marginBottom: "15px", fontWeight: "600" }}>
            💰 Select Payment Method
          </h5>

          <div style={{ display: "grid", gap: "12px", marginBottom: "25px" }}>
            {/* Razorpay Option */}
            <label style={{
              display: "flex",
              alignItems: "center",
              padding: "15px",
              border: paymentMethod === "razorpay" ? "2px solid #bf9456" : "2px solid #e0e0e0",
              borderRadius: "10px",
              cursor: "pointer",
              background: paymentMethod === "razorpay" ? "rgba(191, 148, 86, 0.05)" : "white",
              transition: "all 0.3s ease"
            }}>
              <input
                type="radio"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <span style={{ marginLeft: "12px", fontWeight: "500", color: "#333" }}>
                🔐 Razorpay (UPI/Card) - Instant Payment
              </span>
            </label>

            {/* UPI Manual Option */}
            <label style={{
              display: "flex",
              alignItems: "center",
              padding: "15px",
              border: paymentMethod === "upi" ? "2px solid #bf9456" : "2px solid #e0e0e0",
              borderRadius: "10px",
              cursor: "pointer",
              background: paymentMethod === "upi" ? "rgba(191, 148, 86, 0.05)" : "white",
              transition: "all 0.3s ease"
            }}>
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <span style={{ marginLeft: "12px", fontWeight: "500", color: "#333" }}>
                📱 UPI Manual Payment
              </span>
            </label>

            {/* Cash Option */}
            <label style={{
              display: "flex",
              alignItems: "center",
              padding: "15px",
              border: paymentMethod === "cash" ? "2px solid #bf9456" : "2px solid #e0e0e0",
              borderRadius: "10px",
              cursor: "pointer",
              background: paymentMethod === "cash" ? "rgba(191, 148, 86, 0.05)" : "white",
              transition: "all 0.3s ease"
            }}>
              <input
                type="radio"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <span style={{ marginLeft: "12px", fontWeight: "500", color: "#333" }}>
                💵 Cash on Visit
              </span>
            </label>
          </div>

          {/* UPI Manual */}
          {paymentMethod === "upi" && (
            <div style={{
              background: "#f0f4f8",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              borderTop: "3px solid #2196F3"
            }}>
              <h6 style={{ color: "#2196F3", marginBottom: "15px", fontWeight: "600" }}>
                📲 Pay using UPI
              </h6>

              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    upiLink
                  )}`}
                  alt="QR"
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #e0e0e0",
                    padding: "10px",
                    background: "white"
                  }}
                />
              </div>

              <p style={{ textAlign: "center", color: "#666", marginBottom: "15px", fontSize: "13px" }}>
                UPI ID: <strong style={{ color: "#333", fontSize: "14px" }}>{upiId}</strong>
              </p>

              <a href={upiLink} style={{
                display: "block",
                padding: "12px",
                background: "#2196F3",
                color: "white",
                textAlign: "center",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                marginBottom: "12px",
                transition: "background 0.3s ease"
              }} onMouseOver={(e) => e.target.style.background = "#1976D2"} onMouseOut={(e) => e.target.style.background = "#2196F3"}>
                📲 Open UPI App
              </a>

              <label style={{ display: "block", fontSize: "12px", color: "#666", marginTop: "10px" }}>
                <input
                  type="file"
                  style={{ marginRight: "8px" }}
                  onChange={(e) => setScreenshot(e.target.files[0])}
                />
                Upload payment screenshot
              </label>
            </div>
          )}

          {/* Cash */}
          {paymentMethod === "cash" && (
            <div style={{
              background: "linear-gradient(135deg, #fff3cd 0%, #ffe8a1 100%)",
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "20px",
              border: "2px solid #ffc107",
              color: "#856404"
            }}>
              <p style={{ margin: "0", fontWeight: "500" }}>
                ⏰ You will pay the remaining amount (₹{bookingData.totalAmount - bookingData.advanceAmount}) at the salon during your visit.
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button onClick={handleConfirm} style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #bf9456 0%, #d4af9f 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(191, 148, 86, 0.3)"
          }} onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(191, 148, 86, 0.4)";
          }} onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(191, 148, 86, 0.3)";
          }}>
            ✅ Confirm Booking
          </button>
        </div>

        {/* Footer Info */}
        <div style={{
          textAlign: "center",
          color: "#666",
          fontSize: "12px",
          padding: "15px"
        }}>
          <p style={{ margin: "0" }}>🔒 Your payment is secure and encrypted</p>
          <p style={{ margin: "5px 0 0 0" }}>Questions? Contact us at +91-XXXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
