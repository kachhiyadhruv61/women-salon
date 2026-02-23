import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container py-5">
      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-8 bg-light p-4">
          <h4 className="text-success">✔ Added to Cart</h4>
          <p>Your item has been added successfully.</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="border p-4">
            <h5>Cart Subtotal: ₹{total}</h5>

            <button
              className="btn btn-warning w-100 mt-3"
              onClick={() => navigate("/cart")}
            >
              Go To Cart
            </button>

            <button
              className="btn btn-primary w-100 mt-2"
              onClick={() => navigate("/cart")}
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