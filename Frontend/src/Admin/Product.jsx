import { useState } from "react";

function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: "Herbal Face Pack", price: 499 },
    { id: 2, name: "Organic Hair Oil", price: 399 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (!name || !price) return alert("Fill all fields");

    setProducts([
      ...products,
      { id: Date.now(), name, price },
    ]);

    setName("");
    setPrice("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container py-5">
      <h1>👩‍💼 Admin Product Panel</h1>

      <div className="border p-3 my-4">
        <input
          type="text"
          placeholder="Product Name"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="btn btn-success" onClick={addProduct}>
          Add Product
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
