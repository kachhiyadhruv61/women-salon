import React from "react";

function StaffStatusBtn({ status, onToggle }) {
  return (
    <button
      className={`btn btn-sm ${
        status === "Active" ? "btn-warning" : "btn-success"
      }`}
      onClick={onToggle}
    >
      {status === "Active" ? "Disable" : "Enable"}
    </button>
  );
}

export default StaffStatusBtn;
