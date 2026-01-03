import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("bc_user", email);
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className="form" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h2>Client Login</h2>
        <p className="muted">
          Enter your email to access your project dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button className="button primary" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
