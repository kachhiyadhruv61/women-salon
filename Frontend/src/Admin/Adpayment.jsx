import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";

function Adgallery() {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await apiFetch("/gallery");
      const data = await res.json();

      if (data.success) {
        setGallery(data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  /* ================= DELETE ================= */
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      const res = await apiFetch(`/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Deleted ✅");
        fetchGallery();
      } else {
        alert("Delete failed ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      header: "Image",
      accessorFn: (row) => (
        <img
          src={`http://localhost:5000/uploads/${row.image}`}
          width="60"
          height="60"
          style={{ objectFit: "cover", borderRadius: "6px" }}
          alt="gallery"
        />
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Category",
      accessorKey: "category",
      Cell: ({ cell }) => (
        <span className="badge bg-info text-dark">
          {cell.getValue()}
        </span>
      ),
    },
    {
      header: "Description",
      accessorFn: (row) => row.description || "-",
    },
    {
      header: "Created",
      accessorFn: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteImage(row.original._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gallery Management 🖼️</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-gallery")}
        >
          + Add Image
        </button>
      </div>

      {/* TABLE */}
      <CommonTable
        columns={columns}
        data={gallery}
        fileName="gallery"
        showSelection={true}
      />
    </div>
  );
}

export default Adgallery;