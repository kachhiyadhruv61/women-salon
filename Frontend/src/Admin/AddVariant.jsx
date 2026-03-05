import React, { useState, useEffect } from "react";

const AddVariant = () => {

  const [services, setServices] = useState([]);

  const [variant, setVariant] = useState({
    serviceId: "",
    locationType: "salon",
    price: "",
    durationMinutes: "",
    note: "",
    isAvailable: true
  });

  // Fetch Services
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setVariant({
      ...variant,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      serviceId: variant.serviceId,
      locationType: variant.locationType,
      price: Number(variant.price),
      durationMinutes: Number(variant.durationMinutes),
      note: variant.note,
      isAvailable: variant.isAvailable,
      createdAt: new Date()
    };

    console.log("Variant Saved:", payload);

    // API call here
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h4 className="text-center mb-3">Add Service Variant</h4>

        <form onSubmit={handleSubmit}>

          {/* Select Service */}
          <select
            name="serviceId"
            value={variant.serviceId}
            onChange={handleChange}
            className="form-control mb-3"
            required
          >
            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}

          </select>

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
            className="form-control mb-3"
            required
          />

          {/* Duration */}
          <input
            type="number"
            name="durationMinutes"
            placeholder="Duration (Minutes)"
            value={variant.durationMinutes}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          {/* Note */}
          <textarea
            name="note"
            placeholder="Optional Note"
            value={variant.note}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Available Toggle */}
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
            Add Variant
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddVariant;