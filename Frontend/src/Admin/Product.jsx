import React, { useState, useMemo } from "react";
import CommonTable from "./../Components/CommonTable";

function Product() {
  const [products, setProducts] = useState([
    {
      productId: 1,
      name: "Herbal Face Pack",
      amount: 499,
      stock: 50,
      description: "Facial product",
      status: "Active",
    },
  ]);

  // 🔹 Form States
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  // ➕ ADD PRODUCT
  const addProduct = () => {
    if (!name || !amount || !stock || !description) {
      alert("Please fill all fields");
      return;
    }

    setProducts([
      ...products,
      {
        productId: Date.now(),
        name,
        amount: Number(amount),
        stock: Number(stock),
        description,
        status,
      },
    ]);

    // reset form
    setName("");
    setAmount("");
    setStock("");
    setDescription("");
    setStatus("Active");
  };

  // ❌ DELETE PRODUCT
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.productId !== id));
  };

  // 📊 TABLE COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: "productId",
        header: "Product ID",
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "amount",
        header: "Amount (₹)",
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
        Cell: ({ cell }) => (
          <span
            className={`badge ${
              cell.getValue() === "Active"
                ? "bg-success"
                : "bg-secondary"
            }`}
          >
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "productId",
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

      {/* ➕ ADD PRODUCT FORM */}
      <div className="border p-3 my-4 rounded">
        <h5>Add Product</h5>

        <input
          type="text"
          placeholder="Product Name"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="form-control mb-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="form-control mb-2"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="form-control mb-2"
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

        <button className="btn btn-success" onClick={addProduct}>
          Add Product
        </button>
      </div>

      {/* 📊 COMMON TABLE */}
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
