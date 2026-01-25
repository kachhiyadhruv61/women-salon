

import { useState } from "react";

function Adminservice() {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");

  // Add Service
  const addService = (e) => {
    e.preventDefault();

    if (!serviceName || !price) {
      alert("Please fill all fields");
      return;
    }

    const newService = {
      id: Date.now(),
      name: serviceName,
      price: price,
    };

    setServices([...services, newService]);
    setServiceName("");
    setPrice("");
  };

  // Delete Service
  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Services Management 🛠️</h2>

      {/* Add Service Form */}
      <form onSubmit={addService} className="mb-4">
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add Service</button>
      </form>

      {/* Services List */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Price (₹)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="3" align="center">No services added</td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.price}</td>
                <td>
                  <button onClick={() => deleteService(service.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Adminservice;
