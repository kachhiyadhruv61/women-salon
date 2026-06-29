import { useEffect, useState } from "react";
import { apiFetch, apiUrl } from "../utils/apiFetch";
import CommonTable from "../Components/CommonTable";
import { useNavigate } from "react-router-dom";

function Adgallery() {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);

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
      console.error(error);
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
        fetchGallery();
      }
    } catch (error) {
      console.error(error);
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
          src={apiUrl(`/uploads/${row.image}`)}
          width="60"
          height="60"
          style={{ borderRadius: "6px", cursor: "pointer" }}
          onClick={() => navigate(`/edit-gallery/${row._id}`)}
        />
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Action",
      accessorFn: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/edit-gallery/${row._id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteImage(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gallery Management 🖼️</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/addphotos")}
        >
          + Add Image
        </button>
      </div>

      {/* ================= TABLE ================= */}
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
