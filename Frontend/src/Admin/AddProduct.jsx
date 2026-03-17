import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [editingId] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      amount,
      stock,
      description,
      status,
      createdDate: new Date().toLocaleString(),
    };

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      console.log("Product Added 👉", data);

      // Reset form
      setName("");
      setAmount("");
      setStock("");
      setDescription("");
      setStatus("Active");

      if(response.ok){
  navigate("/product");
}
      // Redirect
      // navigate("/adminproduct");

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3 text-center">
          {editingId ? "Edit Product" : "Add Product ➕"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            className="form-control mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            className="form-control mb-3"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="form-control mb-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;