import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Cart() {
  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate();
  const [setCart] = useState([]);
  const increaseQty = (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id
      ? { ...item, qty: item.qty + 1 }
      : item
  );

  setCart(updatedCart);
};

const decreaseQty = (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id && item.qty > 1
      ? { ...item, qty: item.qty - 1 }
      : item
  );

  setCart(updatedCart);
};
const handleProceedToBuy = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login", { state: { from: "/checkout" } });
  } else {
    navigate("/checkout");
  }
};

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container py-5">
  <div className="row align-items-start">

    {/* LEFT SIDE */}
    <div className="col-lg-8 col-md-7">
      <h3 className="mb-4">Shopping Cart</h3>

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

<div className="d-flex align-items-center mb-2">

  <button
    className="btn btn-sm btn-outline-secondary"
    onClick={() => decreaseQty(item.id)}
  >
    -
  </button>

  <span className="mx-3">{item.qty}</span>

  <button
    className="btn btn-sm btn-outline-secondary"
    onClick={() => increaseQty(item.id)}
  >
    +
  </button>

</div>
            <p className="mb-2">Quantity: {item.qty}</p>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}

      <h5 className="text-end mt-3">
        Subtotal ({cart.length} items): ₹{total}
      </h5>
    </div>

    {/* RIGHT SIDE */}
    <div className="col-lg-4 col-md-5">
      <div className="border rounded p-4 bg-light sticky-top" style={{ top: "100px" }}>
        <h5>Subtotal: ₹{total}</h5>

        <button
          className="btn btn-warning w-100 mt-3"
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
