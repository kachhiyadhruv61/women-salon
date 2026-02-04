import React, { useState } from "react";

function StaffAvailability({ onSave }) {
  const [availability, setAvailability] = useState({
    date: "",
    from: "",
    to: "",
  });

  return (
    <div className="d-flex gap-2">
      <input
        type="date"
        className="form-control form-control-sm"
        onChange={(e) =>
          setAvailability({ ...availability, date: e.target.value })
        }
      />
      <input
        type="time"
        className="form-control form-control-sm"
        onChange={(e) =>
          setAvailability({ ...availability, from: e.target.value })
        }
      />
      <input
        type="time"
        className="form-control form-control-sm"
        onChange={(e) =>
          setAvailability({ ...availability, to: e.target.value })
        }
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={() => onSave(availability)}
      >
        Save
      </button>
    </div>
  );
}

export default StaffAvailability;
