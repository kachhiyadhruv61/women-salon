import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "./../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // ==============================
  // 📌 FETCH PRODUCTS
  // ==============================
  const fetchProducts = async () => {
    try {
      const res = await apiFetch("/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==============================
  // ❌ DELETE PRODUCT
  // ==============================
  const deleteProduct = async (id) => {
    try {
      await apiFetch(`/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ==============================
  // 📊 TABLE COLUMNS
  // ==============================
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
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
        Cell: ({ cell }) => {
          const stock = cell.getValue();

          return (
            <span
              className={`badge ${
                stock === 0
                  ? "bg-danger"
                  : stock < 5
                  ? "bg-warning"
                  : "bg-success"
              }`}
            >
              {stock === 0 ? "Out of Stock" : `${stock} left`}
            </span>
          );
        },
      },

      // 🔥 UPDATE STOCK COLUMN
      {
        header: "Update Stock",
        Cell: ({ row }) => {
          const [qty, setQty] = useState(0);

          const updateStock = async () => {
            try {
              await apiFetch(
                `/products/update-stock/${row.original._id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({ qty }),
                }
              );

              fetchProducts(); // refresh data
            } catch (err) {
              console.error("Stock update failed:", err);
            }
          };

          return (
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control form-control-sm"
                style={{ width: "70px" }}
                placeholder="+/-"
                onChange={(e) => setQty(Number(e.target.value))}
              />
              <button
                className="btn btn-sm btn-success"
                onClick={updateStock}
              >
                Update
              </button>
            </div>
          );
        },
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
        accessorKey: "_id",
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
        <h2> Product Management 👩‍💼</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/addproduct")}
        >
          + Add Product
        </button>
      </div>

      {/* 📊 TABLE */}
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