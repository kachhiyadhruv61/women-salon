import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ SAFE TOTAL (qty fallback fix)
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // ✅ LOGIN CHECK (same as cart page)
  const handleProceedToBuy = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-8 bg-light p-4 rounded shadow-sm">
          <h4 className="text-success">✔ Added to Cart</h4>
          <p>Your item has been added successfully.</p>

          {/* ✅ SMALL IMPROVEMENT */}
          <p className="mt-3">
            Total Items: <strong>{cart.length}</strong>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="border rounded p-4 shadow-sm">

            <h5>Cart Subtotal: ₹{total.toFixed(2)}</h5>

            {/* ✅ Better button flow */}
            <button
              className="btn btn-warning w-100 mt-3"
              onClick={() => navigate("/cart")}
            >
              Go To Cart
            </button>

            <button
              className="btn btn-success w-100 mt-2"
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

export default CartSummary;