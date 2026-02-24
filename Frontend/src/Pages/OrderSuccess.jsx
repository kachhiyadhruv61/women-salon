import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;
  

  return (
    <div className="container text-center py-5">
      <h2 className="text-success">🎉 Order Placed Successfully!</h2>

      <p>Your Order ID: <b>{orderId}</b></p>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>

      <button
        className="btn btn-outline-secondary mt-3 ms-2"
        onClick={() => navigate("/my-orders")}
      >
        View My Orders
      </button>
    </div>
  );
}

export default OrderSuccess;