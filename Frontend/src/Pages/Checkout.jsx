import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2 className="text-center mt-5">No Product Selected</h2>;

  const { product, quantity } = state;
  const total = product.price * quantity;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout 🧾</h1>

      <div className="card p-4">
        <h3>{product.name}</h3>
        <p>Price: ₹{product.price}</p>
        <p>Quantity: {quantity}</p>
        <hr />
        <h4 className="text-success">Total: ₹{total}</h4>

        <button className="btn btn-primary mt-3">
          Confirm Order
        </button>

        <button
          className="btn btn-outline-secondary mt-2"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Checkout;
