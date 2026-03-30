import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [suggestedFor, setSuggestedFor] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Available");
  const [image, setImage] = useState(null); // ✅ image state
  const [preview, setPreview] = useState(null);

  // ✅ IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // ✅ correct
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ FormData inside submit
      const formData = new FormData();
      formData.append("name", name);
      formData.append("amount", Number(amount));
      formData.append("suggestedFor", suggestedFor);
      formData.append("ingredients", ingredients);
      formData.append("stock", Number(stock));
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", image);

      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData, // ✅ NO headers
      });

      const data = await response.json();
      console.log("Product Added 👉", data);

      if (response.ok) {
        alert("Product Added Successfully ✅");

        // ✅ Reset form
        setName("");
        setAmount("");
        setSuggestedFor("");
        setIngredients("");
        setStock("");
        setDescription("");
        setStatus("Available");
        setImage(null);
        setPreview(null);

        navigate("/product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3 text-center">Add Product ➕</h4>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Product Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              width="100"
              className="mb-3 rounded"
            />
          )}

          <input
            type="number"
            placeholder="Amount"
            className="form-control mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <input
  type="text"
  placeholder="Suggested For (e.g. Dry Skin, Hair Fall, Bridal)"
  className="form-control mb-3"
  value={suggestedFor}
  onChange={(e) => setSuggestedFor(e.target.value)}
/>

<textarea
  placeholder="Ingredients (e.g. Aloe Vera, Neem, Keratin)"
  className="form-control mb-3"
  value={ingredients}
  onChange={(e) => setIngredients(e.target.value)}
/>

          <input
            type="number"
            placeholder="Stock"
            className="form-control mb-3"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
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
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>

          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;