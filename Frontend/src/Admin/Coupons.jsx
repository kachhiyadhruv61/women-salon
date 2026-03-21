import React, { useState } from "react";
import CommonTable from "../Components/CommonTable";
import { useNavigate } from "react-router-dom";

function Coupons() {
  const navigate = useNavigate();

  const [couponList, setCouponList] = useState([
    {
      id: 1,
      code: "SAVE20",
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 500,
      maxUsagePerUser: 3,
      expiryDate: "2026-03-30",
      isActive: true,
    },
  ]);

  /* Toggle Active/Inactive */
  const toggleCouponStatus = (id) => {
    setCouponList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  /* Delete Coupon */
  const deleteCoupon = (id) => {
    setCouponList((prev) => prev.filter((c) => c.id !== id));
  };

  /* Columns */
  const columns = [
    {
      header: "#",
      accessor: (_, index) => index + 1,
    },
    {
      header: "Code",
      accessor: "code",
    },
    {
      header: "Discount",
      accessor: (row) =>
        row.discountType === "percentage"
          ? `${row.discountValue}%`
          : `₹${row.discountValue}`,
    },
    {
      header: "Min Order",
      accessor: (row) => `₹${row.minOrderAmount}`,
    },
    {
      header: "Usage Limit",
      accessor: "maxUsagePerUser",
    },
    {
      header: "Expiry Date",
      accessor: "expiryDate",
    },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`badge ${
            row.isActive ? "bg-success" : "bg-danger"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (row) => (
        <>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => toggleCouponStatus(row.id)}
          >
            {row.isActive ? "Deactivate" : "Activate"}
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteCoupon(row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Coupon Management 🎟️</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/addcoupon")}
        >
          + Add Coupon
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={couponList}
        fileName="coupons"
        showSelection={true}
      />
    </div>
  );
}

export default Coupons;