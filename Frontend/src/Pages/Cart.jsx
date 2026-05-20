import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };

  const handleProceedToBuy = () => {
    const token = localStorage.getItem("accessToken");
    console.log("Token in cart:", token); // 🔍 Debug

    if (!token) {
      console.log("No token - blocking navigation"); // 🔍 Debug
      alert("❌ Please login first!");
      navigate("/login", { state: { from: "/checkout" } });
      return; // 🔥 Stop execution
    }
    
    console.log("Token found - proceeding to checkout"); // 🔍 Debug
    navigate("/checkout");
  };

  // ✅ FIXED SUBTOTAL
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(quantities[item._id] || item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const gstRate = 0.05; // 5% GST = 0.05, 10% GST = 0.1, etc.
  const gstAmount = subtotal * gstRate;
  const deliveryCharge = subtotal > 500 ? 0 : 50;

  const discountPercent = 10;
  const discountAmount = (subtotal * discountPercent) / 100;

  const grandTotal = subtotal + gstAmount + deliveryCharge - discountAmount;

  return (
    <div className="container py-5 cart-page">
      <div className="row align-items-start">

        <div className="text-center mb-5 cart-header">
          <h1 className="text-primary">Shopping Cart</h1>
        </div>

        {/* LEFT SIDE */}
        <div className="col-lg-8 col-md-7 cart-items-col">

          {cart.map((item) => (
            <div key={item._id} className="d-flex border rounded p-3 mb-3 bg-white cart-item-card">

              <img
                src={item.img}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="ms-3 flex-grow-1 cart-item-content">
                <h5 className="cart-item-title">{item.name}</h5>

                {/* ✅ PRICE FIX */}
                <p className="cart-item-price">₹{Number(item.price) || 0}</p>

                {/* 🔢 Quantity */}
                <div className="d-flex align-items-center mb-3 cart-qty-row">
                  <span className="fw-semibold me-3">Quantity:</span>

                  <div className="d-flex align-items-center border rounded px-2 py-1 cart-qty-controls">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQtyChange(
                          item._id,
                          Math.max(1, (quantities[item._id] || item.quantity || 1) - 1)
                        )
                      }
                    >
                      -
                    </button>

                    <span className="mx-3 fw-bold">
                      {quantities[item._id] || item.quantity || 1}
                    </span>

                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQtyChange(
                          item._id,
                          Math.min(10, (quantities[item._id] || item.quantity || 1) + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-outline-danger cart-delete-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

         

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4 col-md-5 mt-4 mt-lg-5 cart-summary-col">
          <div className="border rounded p-4 bg-light shadow cart-summary-card">

            <p className="cart-summary-row">Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p className="cart-summary-row">GST (5%): ₹{gstAmount.toFixed(2)}</p>
            <p className="cart-summary-row">Delivery: ₹{deliveryCharge}</p>
            
            {/* 🎟️ DISCOUNT SECTION */}
            <div className="mb-3 p-3 border rounded bg-white cart-discount-box">
              <label className="fw-bold mb-2 d-block">Discount:</label>
              <small className="text-success d-block mt-2">
                ✅ 10%  Applied: ₹{discountAmount.toFixed(2)}
              </small>
            </div>

            <hr />

            <h5>
              Grand Total ({cart.length} items): ₹{grandTotal.toFixed(2)}
            </h5>

            <button
              className="btn btn-success w-100 mt-3 cart-proceed-btn"
              onClick={handleProceedToBuy}
            >
              Proceed to Buy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;