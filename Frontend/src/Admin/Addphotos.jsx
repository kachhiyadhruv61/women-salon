import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch";
import imageCompression from "browser-image-compression";

const Addphotos = () => {
  const navigate = useNavigate();

  const [gallery, setGallery] = useState({
    category: "Salon",
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setGallery({ ...gallery, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE ================= */
  const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // 🔒 Validation (5MB max before compression)
  if (file.size > 5 * 1024 * 1024) {
    alert("Image too large! Max 5MB allowed.");
    return;
  }

  const options = {
    maxSizeMB: 2,          // final ~2MB
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  

  try {
    const compressedFile = await imageCompression(file, options);

    // ✅ FIXED: use gallery state
    setGallery((prev) => ({
      ...prev,
      image: compressedFile,
    }));
    console.log(gallery.image?.size);

    // ✅ Preview
    setPreview(URL.createObjectURL(compressedFile));

  } catch (error) {
    console.error("Compression error:", error);
  }
};

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

     // ✅ FIRST validation
  if (!gallery.image) {
    alert("Please select image");
    return;
  }


    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("category", gallery.category);
      formData.append("image", gallery.image);

      const res = await apiFetch("/gallery", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        alert("Image Added Successfully ✅");

        // redirect
        navigate("/adgallery");

      } else {
        alert("Failed to add image ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h3 className="text-center mb-3">Add Gallery Image</h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          {/* CATEGORY */}
          <select
            name="category"
            className="form-control mb-3"
            value={gallery.category}
            onChange={handleChange}
          >
            <option>Salon</option>
            <option>Natural Place</option>
          </select>

          {/* IMAGE */}
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              width="120"
              className="mb-3 rounded"
            />
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Image"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Addphotos;