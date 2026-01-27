import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Herbal Face Pack",
      price: 499,
      qty: 2,
      img: "/img/facepack.png",
    },
    {
      id: 2,
      name: "Organic Hair Oil",
      price: 399,
      qty: 1,
      img: "/img/hairoil.png",
    },
  ]);

  const updateQty = (id, type) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                type === "inc"
                  ? Math.min(item.qty + 1, 10)
                  : Math.max(item.qty - 1, 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4">🛒 Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center border p-3 mb-3"
        >
          <img src={item.img} alt="" width="80" />

          <div className="ms-3 flex-grow-1">
            <h5>{item.name}</h5>
            <p>₹{item.price}</p>

            <button onClick={() => updateQty(item.id, "dec")}>-</button>
            <span className="mx-2">{item.qty}</span>
            <button onClick={() => updateQty(item.id, "inc")}>+</button>
          </div>

          <button
            className="btn btn-danger"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        className="btn btn-success mt-3"
        onClick={() => navigate("/payment", { state: { total } })}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Cart;