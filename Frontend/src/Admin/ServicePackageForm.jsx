import React, { useState } from "react";

const ServicePackageForm = () => {

  const [form, setForm] = useState({
    name: "",
    description: "",
    priceMin: "",
    priceMax: "",
    duration: "",
    staffType: "",
    locationType: [],
    includedServices: [
      { serviceId: "", serviceVariantId: "" }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleLocationChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        locationType: [...form.locationType, value]
      });
    } else {
      setForm({
        ...form,
        locationType: form.locationType.filter(
          (loc) => loc !== value
        )
      });
    }
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;

    const updated = [...form.includedServices];
    updated[index][name] = value;

    setForm({
      ...form,
      includedServices: updated
    });
  };

  const addService = () => {
    setForm({
      ...form,
      includedServices: [
        ...form.includedServices,
        { serviceId: "", serviceVariantId: "" }
      ]
    });
  };

  const removeService = (index) => {
    const updated = [...form.includedServices];
    updated.splice(index, 1);

    setForm({
      ...form,
      includedServices: updated
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="container mt-4">
      <h3>Create Service Package</h3>

      <form onSubmit={handleSubmit}>

        {/* Package Name */}
        <div className="mb-3">
          <label>Package Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="row">
          <div className="col-md-6">
            <label>Price Min</label>
            <input
              type="number"
              name="priceMin"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Price Max</label>
            <input
              type="number"
              name="priceMax"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Duration */}
        <div className="mb-3 mt-3">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* Staff Type */}
        <div className="mb-3">
          <label>Staff Type</label>
          <select
            name="staffType"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">Select Staff</option>
            <option>Senior Team</option>
            <option>Expert Team</option>
          </select>
        </div>

        {/* Location Type */}
        <div className="mb-3">
          <label>Location Type</label>

          <div>
            <input
              type="checkbox"
              value="salon"
              onChange={handleLocationChange}
            /> Salon

            <input
              type="checkbox"
              value="home"
              className="ms-3"
              onChange={handleLocationChange}
            /> Home

            <input
              type="checkbox"
              value="natural"
              className="ms-3"
              onChange={handleLocationChange}
            /> Natural Place
          </div>
        </div>

        <hr />

        <h5>Included Services</h5>

        {form.includedServices.map((service, index) => (
          <div key={index} className="row mb-3">

            <div className="col-md-5">
              <label>Service</label>
              <input
                type="text"
                name="serviceId"
                className="form-control"
                onChange={(e) =>
                  handleServiceChange(index, e)
                }
              />
            </div>

            <div className="col-md-5">
              <label>Variant</label>
              <input
                type="text"
                name="serviceVariantId"
                className="form-control"
                onChange={(e) =>
                  handleServiceChange(index, e)
                }
              />
            </div>

            <div className="col-md-2 mt-4">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeService(index)}
              >
                Remove
              </button>
            </div>

          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addService}
        >
          + Add Service
        </button>

        <br />

        <button className="btn btn-primary">
          Save Package
        </button>

      </form>
    </div>
  );
};

export default ServicePackageForm;