import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const email = localStorage.getItem("bc_user");
  const navigate = useNavigate();

  const requests =
    JSON.parse(localStorage.getItem(`bc_requests_${email}`)) || [];

  const logout = () => {
    localStorage.removeItem("bc_user");
    navigate("/");
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
              <div key={i} className="card" style={{ marginBottom: 12 }}>
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
