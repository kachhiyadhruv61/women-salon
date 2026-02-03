import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container py-5">
      <h2>My Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between border p-3 mb-2">
              <div>
                <h5>{item.name}</h5>
                <p>₹{item.price} × {item.qty}</p>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h4>Total: ₹{total}</h4>

          <Link to="/checkout" className="btn btn-success">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
