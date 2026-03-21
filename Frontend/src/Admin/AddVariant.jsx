import React, { useState, useEffect } from "react";

const AddVariant = () => {

  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingId] = useState(null);

  const [variant, setVariant] = useState({
    serviceId: "",
    locationType: "salon",
    price: "",
    durationMinutes: "",
    note: "",
    isAvailable: true
  });

  // ===============================
  // FETCH SERVICES
  // ===============================
  useEffect(() => {

    fetch("http://localhost:5000/services")
      .then(res => res.json())
      .then(data => setServices(data.data))
      .catch(err => console.log(err));

  }, []);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setVariant({
      ...variant,
      [name]: type === "checkbox" ? checked : value
    });

  };

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {

    let err = {};

    if (!variant.serviceId)
      err.serviceId = "Service required";

    if (!variant.price)
      err.price = "Price required";

    if (!variant.durationMinutes)
      err.durationMinutes = "Duration required";

    setErrors(err);

    return Object.keys(err).length === 0;

  };

  // ===============================
  // SUBMIT VARIANT
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const payload = {
      serviceId: variant.serviceId,
      locationType: variant.locationType,
      price: Number(variant.price),
      durationMinutes: Number(variant.durationMinutes),
      note: variant.note,
      isAvailable: variant.isAvailable,
      createdAt: new Date()
    };

    try {

      const res = await fetch("http://localhost:5000/serviceVariants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {

        alert("Variant Added Successfully ✅");

        setVariant({
          serviceId: "",
          locationType: "salon",
          price: "",
          durationMinutes: "",
          note: "",
          isAvailable: true
        });

        setErrors({});

      } else {

        alert(data.message || "Variant Add Failed ❌");

      }

    } catch (error) {

      console.log(error);
      alert("Server Error ❌");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow p-4">

        <h4 className="text-center mb-3">
          {editingId ? "Edit Variant" : "Add Service Variant"}
        </h4>

        <form onSubmit={handleSubmit}>

          {/* Select Service */}
          <select
            name="serviceId"
            value={variant.serviceId}
            onChange={handleChange}
            className="form-control mb-2"
          >

            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}

          </select>

          <small className="text-danger">{errors.serviceId}</small>

          {/* Location Type */}
          <select
            name="locationType"
            value={variant.locationType}
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option value="salon">At Salon</option>
            <option value="natural">At Natural Place</option>
            <option value="home">At Home</option>
          </select>

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={variant.price}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.price}</small>

          {/* Duration */}
          <input
            type="number"
            name="durationMinutes"
            placeholder="Duration (Minutes)"
            value={variant.durationMinutes}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.durationMinutes}</small>

          {/* Note */}
          <textarea
            name="note"
            placeholder="Optional Note"
            value={variant.note}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Available */}
          <div className="form-check mb-3">

            <input
              type="checkbox"
              name="isAvailable"
              checked={variant.isAvailable}
              onChange={handleChange}
              className="form-check-input"
              id="availableCheck"
            />

            <label className="form-check-label" htmlFor="availableCheck">
              Variant Available
            </label>

          </div>

          <button className="btn btn-primary w-100">
            {editingId ? "Update Variant" : "Add Variant"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddVariant;