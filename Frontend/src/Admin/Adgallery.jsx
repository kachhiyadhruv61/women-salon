import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import CommonTable from "../Components/CommonTable";

function Adgallery() {
  const [gallery, setGallery] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category: "Salon",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

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

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      image: null,
    });

    setPreview(`http://localhost:5000/uploads/${item.image}`);
  };

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      let res;

      if (editId) {
        // UPDATE
        res = await apiFetch(`/gallery/${editId}`, {
          method: "PUT",
          body: data,
        });
      } else {
        // ADD
        res = await apiFetch(`/gallery`, {
          method: "POST",
          body: data,
        });
      }

      const result = await res.json();

      if (result.success) {
        alert(editId ? "Updated ✅" : "Added ✅");

        // RESET
        setForm({
          title: "",
          category: "Salon",
          description: "",
          image: null,
        });

        setPreview(null);
        setEditId(null);

        fetchGallery();
      }
    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  /* ================= TABLE ================= */
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
          style={{ cursor: "pointer", borderRadius: "6px" }}
          onClick={() => handleEdit(row)} // 🔥 CLICK → EDIT
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
    },
    {
      header: "Description",
      accessorFn: (row) => row.description || "-",
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

      {/* ================= FORM ================= */}
      <div className="card p-4 shadow mb-4">
        <h4 className="text-center mb-3">
          {editId ? "Edit Image" : "Add Image"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control mb-2"
            value={form.title}
            onChange={handleChange}
          />

          <select
            name="category"
            className="form-control mb-2"
            value={form.category}
            onChange={handleChange}
          >
            <option>Salon</option>
            <option>Farmhouse</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="form-control mb-2"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="file"
            className="form-control mb-2"
            onChange={handleImage}
          />

          {preview && (
            <img src={preview} width="100" className="mb-2 rounded" />
          )}

          <button className="btn btn-primary w-100">
            {editId ? "Update Image" : "Add Image"}
          </button>
        </form>
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