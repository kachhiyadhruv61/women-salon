import React, { useState, useEffect } from "react";

const ServicePackageForm = () => {

  const [editingId] = useState(null);

  const [services, setServices] = useState([]);
  const [variants, setVariants] = useState([]);

  const [errors, setErrors] = useState({});

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

  // ===============================
  // FETCH SERVICES
  // ===============================
  useEffect(() => {

    fetch("http://localhost:5000/services")
      .then(res => res.json())
      .then(data => setServices(data.data || []))
      .catch(err => console.log(err));

  }, []);

  // ===============================
  // FETCH VARIANTS
  // ===============================
  useEffect(() => {

    fetch("http://localhost:5000/serviceVariants")
      .then(res => res.json())
      .then(data => setVariants(data.data || []))
      .catch(err => console.log(err));

  }, []);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  // ===============================
  // LOCATION CHECKBOX
  // ===============================
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
        locationType: form.locationType.filter(loc => loc !== value)
      });

    }

  };

  // ===============================
  // INCLUDED SERVICE CHANGE
  // ===============================
  const handleServiceChange = (index, e) => {

    const { name, value } = e.target;

    const updated = [...form.includedServices];

    updated[index][name] = value;

    setForm({
      ...form,
      includedServices: updated
    });

  };

  // ===============================
  // ADD SERVICE
  // ===============================
  const addService = () => {

    setForm({
      ...form,
      includedServices: [
        ...form.includedServices,
        { serviceId: "", serviceVariantId: "" }
      ]
    });

  };

  // ===============================
  // REMOVE SERVICE
  // ===============================
  const removeService = (index) => {

    const updated = [...form.includedServices];

    updated.splice(index, 1);

    setForm({
      ...form,
      includedServices: updated
    });

  };

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {

    let err = {};

    if (!form.name.trim())
      err.name = "Package name required";

    if (!form.priceMin)
      err.priceMin = "Minimum price required";

    if (!form.priceMax)
      err.priceMax = "Maximum price required";

    if (!form.duration)
      err.duration = "Duration required";

    setErrors(err);

    return Object.keys(err).length === 0;

  };

  // ===============================
  // SUBMIT PACKAGE
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const payload = {
      name: form.name,
      description: form.description,
      priceMin: Number(form.priceMin),
      priceMax: Number(form.priceMax),
      duration: Number(form.duration),
      staffType: form.staffType,
      locationType: form.locationType,
      includedServices: form.includedServices,
      createdAt: new Date()
    };

    try {

      const res = await fetch("http://localhost:5000/servicePackages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {

        alert("Package Added Successfully ✅");

        setForm({
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

        setErrors({});

      } else {

        alert(data.message || "Package Add Failed ❌");

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
          {editingId ? "Edit Package" : "Create Service Package"}
        </h4>

        <form onSubmit={handleSubmit}>

          {/* Package Name */}
          <input
            type="text"
            name="name"
            placeholder="Package Name"
            value={form.name}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.name}</small>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Price */}
          <div className="row">

            <div className="col-md-6">

              <input
                type="number"
                name="priceMin"
                placeholder="Min Price"
                value={form.priceMin}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <small className="text-danger">{errors.priceMin}</small>

            </div>

            <div className="col-md-6">

              <input
                type="number"
                name="priceMax"
                placeholder="Max Price"
                value={form.priceMax}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <small className="text-danger">{errors.priceMax}</small>

            </div>

          </div>

          {/* Duration */}
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Staff Type */}
          <select
            name="staffType"
            value={form.staffType}
            onChange={handleChange}
            className="form-control mb-3"
          >

            <option value="">Select Staff</option>
            <option>Senior Team</option>
            <option>Expert Team</option>

          </select>

          {/* Location */}
          <div className="mb-3">

            <label>Location Type</label>

            <div>

              <input type="checkbox" value="salon" onChange={handleLocationChange} /> Salon

              <input type="checkbox" value="home" className="ms-3" onChange={handleLocationChange} /> Home

              <input type="checkbox" value="natural" className="ms-3" onChange={handleLocationChange} /> Natural Place

            </div>

          </div>

          <hr />

          <h5>Included Services</h5>

          {form.includedServices.map((service, index) => (

            <div key={index} className="row mb-3">

              <div className="col-md-5">

                <select
                  name="serviceId"
                  value={service.serviceId}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="form-control"
                >

                  <option value="">Select Service</option>

                  {services.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="col-md-5">

                <select
                  name="serviceVariantId"
                  value={service.serviceVariantId}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="form-control"
                >

                  <option value="">Select Variant</option>

                  {variants.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.locationType} - ₹{v.price}
                    </option>
                  ))}

                </select>

              </div>

              <div className="col-md-2">

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

          <button className="btn btn-primary w-100">
            Save Package
          </button>

        </form>

      </div>

    </div>
  );
};

export default ServicePackageForm;