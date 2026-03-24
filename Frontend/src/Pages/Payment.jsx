// import { useLocation, useNavigate } from "react-router-dom";

// function Payment() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state) return <h2>No Amount Found</h2>;

//   return (
//     <div className="container py-5">
//       <h1>💳 Payment</h1>

//       <h3 className="text-success mt-3">
//         Amount to Pay: ₹{state.total}
//       </h3>

//       <div className="mt-4">
//         <button
//           className="btn btn-primary me-2"
//           onClick={() => alert("Payment Successful ✅")}
//         >
//           Pay with Card
//         </button>

//         <button
//           className="btn btn-warning"
//           onClick={() => alert("UPI Payment Successful ✅")}
//         >
//           Pay with UPI
//         </button>
//       </div>

//       <button
//         className="btn btn-outline-secondary mt-3"
//         // onClick={() => navigate("/")}
//       >
//         Back to Home
//       </button>
//     </div>
//   );
// }

// export default Payment;
