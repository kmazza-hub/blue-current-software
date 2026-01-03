import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const email = (localStorage.getItem("bc_user") || "").trim();

  // If not logged in, bounce to login
  if (!email) return <Navigate to="/login" replace />;

  // Open mailto exactly once after submitting a request
  useEffect(() => {
    const mailto = sessionStorage.getItem("bc_open_mailto_once");
    if (!mailto) return;

    sessionStorage.removeItem("bc_open_mailto_once");

    // This triggers the email compose without causing router thrash
    window.location.href = mailto;
  }, []);

  const requests = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(`bc_requests_${email}`)) || [];
    } catch {
      return [];
    }
  }, [email]);

const logout = () => {
  localStorage.removeItem("bc_user");
  sessionStorage.removeItem("bc_open_mailto_once");
  window.location.assign("/"); // ✅ bypasses react-router if it’s stuck
};


  return (
    <div className="page">
      <div className="section">
        <h2>Dashboard</h2>
        <p className="muted">Logged in as {email}</p>

        <div className="heroCtas">
          <Link to="/dashboard/new" className="button primary">
            New request
          </Link>
          <button className="button ghost" onClick={logout}>
            Log out
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          {requests.length === 0 ? (
            <p className="muted">No requests yet.</p>
          ) : (
            requests.map((r, i) => (
              <div key={`${r.title}-${i}`} className="card" style={{ marginBottom: 12 }}>
                <h3>{r.title}</h3>
                <p className="muted">{r.category}</p>
                <p>{r.details}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
