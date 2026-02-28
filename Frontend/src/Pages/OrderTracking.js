import React from "react";

function OrderTracking({ status }) {

  const steps = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="container my-4">
      <h5 className="mb-4">Track Your Order</h5>

      <div className="d-flex justify-content-between position-relative">

        {steps.map((step, index) => (
          <div key={index} className="text-center flex-fill position-relative">

            {/* Circle */}
            <div
              className={`rounded-circle mx-auto mb-2 ${
                index <= currentStep ? "bg-success" : "bg-secondary"
              }`}
              style={{
                width: "30px",
                height: "30px",
                color: "white",
                lineHeight: "30px"
              }}
            >
              {index + 1}
            </div>

            {/* Label */}
            <small
              className={`fw-semibold ${
                index <= currentStep ? "text-success" : "text-muted"
              }`}
            >
              {step}
            </small>

          </div>
        ))}

      </div>
    </div>
  );
}

export default OrderTracking;