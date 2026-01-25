import { useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Add Product
  const addProduct = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price,
      stock,
    };

    setProducts([...products, newProduct]);

    setName("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  // Delete Product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Product Management 🧴</h2>

      {/* Product Form */}
      <form onSubmit={addProduct} className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Organic Hair Care</option>
          <option>Organic Skin Care</option>
          <option>Natural Oils</option>
          <option>Herbal Products</option>
        </select>

        <input
          type="number"
          placeholder="Price (₹)"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          className="form-control mb-2"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button className="btn btn-success w-100">Add Product</button>
      </form>

      {/* Product Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No products added
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(p.id)}
                  >
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

export default Product;
