import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ SAFE TOTAL (FULL FIX)
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const gst = subtotal * 0.13;
  const total = subtotal + gst;

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

          <p className="mt-3">
            Total Items: <strong>{cart.length}</strong>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="border rounded p-4 shadow-sm">

            {/* ✅ FIXED VALUES */}
            <h6>Subtotal: ₹{subtotal.toFixed(2)}</h6>
            <h6>GST (13%): ₹{gst.toFixed(2)}</h6>
            <h5>Total: ₹{total.toFixed(2)}</h5>

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