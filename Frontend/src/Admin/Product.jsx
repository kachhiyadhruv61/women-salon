import React, { useState, useMemo } from "react";
import CommonTable from "./../Components/CommonTable"; // path check karjo

function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: "Herbal Face Pack", price: 499,stock:50, description:"facial",status:"active" },
    { id: 2, name: "Organic Hair Oil", price: 399 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (!name || !price) {
      alert("Fill all fields");
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        name,
        price: Number(price),
      },
    ]);

    setName("");
    setPrice("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // 🔹 Columns for CommonTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "price",
        header: "Price (₹)",
        Cell: ({ cell }) => `₹${cell.getValue()}`,
      },
       {
        accessorKey: "stock",
        header: "Stock",
      },
       {
        accessorKey: "description",
        header: "Description",
      },
       {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "id",
        header: "Action",
        Cell: ({ cell }) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteProduct(cell.getValue())}
          >
            Delete
          </button>
        ),
      },
    ],
    [products]
  );

  return (
    <div className="container py-5">
      <h1>👩‍💼 Admin Product Panel</h1>

      {/* ➕ Add Product Form */}
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

      {/* 📊 Product Table */}
      <CommonTable
        columns={columns}
        data={products}
        fileName="products"
        showSelection={true}
      />
    </div>
  );
}

export default Product;
