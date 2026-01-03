import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // If already logged in, bounce straight to dashboard
  useEffect(() => {
    const user = localStorage.getItem("bc_user");
    if (user) navigate("/dashboard", { replace: true });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    localStorage.setItem("bc_user", trimmed);

    // Navigate immediately
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="page">
      <div className="form" style={{ maxWidth: 520, margin: "80px auto" }}>
        <h2>Client Login</h2>
        <p className="muted">Enter your email to access your project dashboard.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
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
