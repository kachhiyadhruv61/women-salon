import { useState } from "react";
import { apiFetch } from "../utils/apiFetch"; // ✅ tamaru custom function

function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    occupation: "",
    city: "",
    rating: 0,
    comment: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ⭐ Star Rating
  const handleRating = (value) => {
    setForm({ ...form, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(form) // ✅ IMPORTANT
      });

      if (response.success) {
        alert("Feedback Submitted ✅");
        setForm({
          name: "",
          occupation: "",
          city: "",
          rating: 0,
          comment: ""
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="container mt-4">
      <h3>User Feedback</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={form.occupation}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />

        {/* ⭐ Star Rating */}
        <div style={{ margin: "10px 0" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                color: star <= form.rating ? "gold" : "gray"
              }}
              onClick={() => handleRating(star)}
            >
              ⭐
            </span>
          ))}
        </div>

        <textarea
          name="comment"
          placeholder="Write your feedback..."
          value={form.comment}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;