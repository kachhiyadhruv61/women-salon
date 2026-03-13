import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function Cart() {
  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate();

   // 🔥 Quantity per product maintain karva mate object
    const [quantities, setQuantities] = useState({});
   const handleQtyChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };
 
const handleProceedToBuy = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login", { state: { from: "/checkout" } });
  } else {
    navigate("/checkout");
  }
};

 const subtotal = cart.reduce(
  (sum, item) =>
    sum + item.price * (quantities[item.id] || item.qty || 1),
  0
);

  const gstRate = 0.18;
const gstAmount = subtotal * gstRate;
const deliveryCharge = subtotal > 500 ? 0 : 50;

const [coupon, setCoupon] = useState("");
const [discount, setDiscount] = useState(0);

const grandTotal = subtotal + gstAmount + deliveryCharge - discount;

const applyCoupon = () => {
  if (coupon === "SAVE10") {
    setDiscount(subtotal * 0.10);
  } else if (coupon === "FLAT50") {
    setDiscount(50);
  } else {
    setDiscount(0);
    alert("Invalid Coupon");
  }
};

  return (
    <div className="container py-5">
  <div className="row align-items-start">
    <div className="text-center mb-5">
        <h1 className="font-dancing-script text-primary">Shopping Cart</h1>
      </div>

    {/* LEFT SIDE */}
    <div className="col-lg-8 col-md-7">

      {cart.map((item) => (
        <div key={item.id} className="d-flex border rounded p-3 mb-3 bg-white">

          <img
            src={item.img}
            alt={item.name}
            style={{ width: "120px", height: "120px", objectFit: "contain" }}
          />

          <div className="ms-3 flex-grow-1">
            <h5>{item.name}</h5>
           <p>₹{item.price}</p>

{/* 🔢 Quantity */}
<div className="d-flex align-items-center mb-3">
  <span className="fw-semibold me-3">Quantity:</span>

  <div className="d-flex align-items-center border rounded px-2 py-1">
    <button
      className="btn btn-sm btn-outline-secondary"
      onClick={() =>
        handleQtyChange(
          item.id,
          Math.max(1, (quantities[item.id] || 1) - 1)
        )
      }
    >
      -
    </button>

    <span className="mx-3 fw-bold">
      {quantities[item.id] || 1}
    </span>

    <button
      className="btn btn-sm btn-outline-secondary"
      onClick={() =>
        handleQtyChange(
          item.id,
          Math.min(10, (quantities[item.id] || 1) + 1)
        )
      }
    >
      +
    </button>
  </div>
</div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
      <div className="mb-3">
  <button
    className="btn btn-outline-primary"
    onClick={() => navigate("/products")}
  >
    ← Add More Products
  </button>
</div>

    </div>

    {/* RIGHT SIDE */}
    <div className="col-lg-4 col-md-5 mt-4 mt-lg-5">
      <div className="border rounded p-4 bg-light shadow" style={{ top: "120px" }}
>
  <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
  <p>GST (13%): ₹{gstAmount.toFixed(2)}</p>
  <p>Delivery: ₹{deliveryCharge}</p>
  <p>Discount: -₹{discount.toFixed(2)}</p>

  <hr />

  <h5>Grand Total ({cart.length} items): ₹{grandTotal.toFixed(2)}</h5>

  {/* Coupon Input */}
  <div className="mt-3">
    <input
      type="text"
      placeholder="Enter Coupon Code"
      value={coupon}
      onChange={(e) => setCoupon(e.target.value)}
      className="form-control mb-2"
    />
    <button
      className="btn btn-warning w-100"
      onClick={applyCoupon}
    >
      Apply Coupon
    </button>
  </div>

        <button
          className="btn btn-success w-100 mt-3"
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
