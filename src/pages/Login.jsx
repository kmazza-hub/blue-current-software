import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");

  // Read returnTo from query string (ex: /login?returnTo=/dashboard/new?paid=Fix%20%26%20Ship)
  const returnTo = useMemo(() => {
    const rt = params.get("returnTo");
    return rt && rt.trim() ? rt : "/dashboard";
  }, [params]);

  const isAuthed = () => {
    const v = localStorage.getItem("bc_user");
    return Boolean(v && v.trim());
  };

  // If already logged in, go where we intended (or dashboard)
  useEffect(() => {
    if (isAuthed()) {
      navigate(returnTo, { replace: true });
    }
  }, [navigate, returnTo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    localStorage.setItem("bc_user", trimmed);

    // Navigate to intended destination (or dashboard)
    navigate(returnTo, { replace: true });
  };

  return (
    <div className="page">
      <div className="form" style={{ maxWidth: 560, margin: "80px auto" }}>
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

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
            <button className="button primary" type="submit">
              Continue
            </button>

            <Link className="button ghost" to="/">
              Back to site
            </Link>
          </div>
        </form>

        <p className="finePrint" style={{ marginTop: 14 }}>
          This is a simple client portal login (email-only) for now.
        </p>
      </div>
    </div>
  );
}
