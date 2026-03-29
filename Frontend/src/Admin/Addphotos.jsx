import { useState } from "react";

function Addphotos() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("image", form.image);

    await fetch("http://localhost:5000/gallery/add", {
      method: "POST",
      body: data,
    });

    alert("Uploaded!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Addphotos;