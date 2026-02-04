import React from "react";

function AssignService({ services, onAssign }) {
  return (
    <select
      className="form-select form-select-sm"
      onChange={(e) => onAssign(e.target.value)}
    >
      <option value="">Select</option>
      {services.map((s, i) => (
        <option key={i} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

export default AssignService;
