// import React, { useState } from "react";

// const AddCoupon = () => {
//   const [editingId] = useState(null);

//   const [coupon, setCoupon] = useState({
//     code: "",
//     discountType: "percentage",
//     discountValue: "",
//     minOrderAmount: "",
//     maxUsagePerUser: "",
//     expiryDate: "",
//     isActive: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setCoupon({
//       ...coupon,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Coupon Saved:", coupon);

//     // 👉 Yaha API call karso
//     // axios.post("/api/coupons/create", coupon)

//     alert("Coupon Added Successfully ✅");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card shadow p-4">
//         <h4 className="mb-3 text-center">
//           {editingId ? "Edit Coupon" : "Add Coupon"}
//         </h4>

//         <form onSubmit={handleSubmit}>
//           {/* Coupon Code */}
//           <input
//             type="text"
//             name="code"
//             placeholder="Coupon Code (e.g. SAVE20)"
//             value={coupon.code}
//             onChange={handleChange}
//             className="form-control mb-3"
//             required
//           />

//           {/* Discount Type */}
//           <select
//             name="discountType"
//             value={coupon.discountType}
//             onChange={handleChange}
//             className="form-control mb-3"
//           >
//             <option value="percentage">Percentage (%)</option>
//             <option value="flat">Flat Amount (₹)</option>
//           </select>

//           {/* Discount Value */}
//           <input
//             type="number"
//             name="discountValue"
//             placeholder="Discount Value"
//             value={coupon.discountValue}
//             onChange={handleChange}
//             className="form-control mb-3"
//             required
//           />

//           {/* Minimum Order Amount */}
//           <input
//             type="number"
//             name="minOrderAmount"
//             placeholder="Minimum Order Amount (₹)"
//             value={coupon.minOrderAmount}
//             onChange={handleChange}
//             className="form-control mb-3"
//           />

//           {/* Max Usage Per User */}
//           <input
//             type="number"
//             name="maxUsagePerUser"
//             placeholder="Max Usage Per User"
//             value={coupon.maxUsagePerUser}
//             onChange={handleChange}
//             className="form-control mb-3"
//             required
//           />

//           {/* Expiry Date */}
//           <input
//             type="date"
//             name="expiryDate"
//             value={coupon.expiryDate}
//             onChange={handleChange}
//             className="form-control mb-3"
//             required
//           />

//           {/* Active Status */}
//           <div className="form-check mb-3">
//             <input
//               type="checkbox"
//               name="isActive"
//               checked={coupon.isActive}
//               onChange={handleChange}
//               className="form-check-input"
//               id="activeCoupon"
//             />
//             <label className="form-check-label" htmlFor="activeCoupon">
//               Active Coupon
//             </label>
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             {editingId ? "Update Coupon" : "Add Coupon"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCoupon;