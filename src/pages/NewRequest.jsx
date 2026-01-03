import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewRequest() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bug Fix");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("bc_user");

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing =
      JSON.parse(localStorage.getItem(`bc_requests_${email}`)) || [];

    existing.push({
      title,
      category,
      details,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(
      `bc_requests_${email}`,
      JSON.stringify(existing)
    );

    window.location.href = `mailto:bluecurrentsoftware@gmail.com?subject=New Client Request (${category})&body=${encodeURIComponent(
      `From: ${email}\n\nTitle: ${title}\n\nDetails:\n${details}`
    )}`;

    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className="form" style={{ maxWidth: 600, margin: "60px auto" }}>
        <h2>New request</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Bug Fix</option>
              <option>Feature</option>
              <option>Deployment</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Details
            <textarea
              rows="5"
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>

          <button className="button primary" type="submit">
            Submit request
          </button>
        </form>
      </div>
    </div>
  );
}
