import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const addProduct = () => {
    if (!name || !amount || !stock) {
      alert("Please fill required fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      amount,
      stock,
      description,
      status,
      createdDate: new Date().toLocaleString(),
    };

    console.log("Product Added 👉", newProduct);

    // 🔥 Future: API call or localStorage save

    // Reset form
    setName("");
    setAmount("");
    setStock("");
    setDescription("");
    setStatus("Active");

    // Redirect back to product list page
    navigate("/adminproduct");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">
        <h4 className="mb-3 text-center">➕ Add New Product</h4>

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

        <button className="btn btn-success w-100" onClick={addProduct}>
          Add Product
        </button>

      </div>
    </div>
  );
}

export default AddProduct;
