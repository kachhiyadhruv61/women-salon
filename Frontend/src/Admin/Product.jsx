import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "./../Components/CommonTable";

function Product() {
  const navigate = useNavigate();
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
    [deleteProduct]
  );

  return (
    <div className="container py-5">
     <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Product Management 👩‍💼</h2>

         <button
          className="btn btn-primary"
          onClick={() => navigate("/addproduct")}
        >
          + Add Product
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
};

export default Product;
