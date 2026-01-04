import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRequests, saveRequests } from "../utils/requests";

const getUserEmail = () => localStorage.getItem("bc_user") || "";

const formatDateTime = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const badgeClass = (value) => {
  const v = String(value || "").toLowerCase();
  if (v.includes("submitted")) return "badge badgeBlue";
  if (v.includes("in progress")) return "badge badgeAmber";
  if (v.includes("done")) return "badge badgeGreen";
  return "badge";
};

export default function Dashboard() {
  const navigate = useNavigate();
  const email = getUserEmail();

  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const requests = useMemo(() => getRequests(email), [email]);

  const filtered = useMemo(() => {
    if (statusFilter === "All") return requests;
    return requests.filter((r) => r.status === statusFilter);
  }, [requests, statusFilter]);

  const handleLogout = () => {
    localStorage.removeItem("bc_user");
    navigate("/login", { replace: true });
  };

  const setRequestStatus = (id, nextStatus) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status: nextStatus } : r));
    saveRequests(email, updated);
    // quick refresh without complex state management:
    navigate(0);
  };

  return (
    <div className="page">
      <div className="header" style={{ marginBottom: 0 }}>
        <div className="brand">
          <div className="logoImageWrap">
            <img
              src="/blue-current-logo.png"
              alt="Blue Current Software logo"
              className="logoImage"
            />
          </div>
          <div>
            <div className="name">Blue Current Software</div>
            <div className="tagline">Always in motion.</div>
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className="navCta">
            Back to site
          </Link>
          <button className="button ghost" type="button" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </div>

      <main>
        <section className="section" style={{ paddingTop: 32 }}>
          <h2>Dashboard</h2>
          <p className="muted">Logged in as {email}</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <button
              className="button primary"
              type="button"
              onClick={() => navigate("/dashboard/new")}
            >
              New request
            </button>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                height: 42,
                borderRadius: 12,
                padding: "0 12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "inherit",
              }}
              aria-label="Filter requests by status"
            >
              <option>All</option>
              <option>Submitted</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div style={{ marginTop: 18 }}>
            {filtered.length === 0 ? (
              <p className="muted">No requests yet.</p>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                {filtered.map((r) => {
                  const isOpen = expandedId === r.id;
                  return (
                    <div key={r.id} className="card">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <h3 style={{ marginBottom: 6 }}>{r.type}</h3>
                          <div className="muted" style={{ fontSize: 14 }}>
                            {formatDateTime(r.createdAt)}
                          </div>
                        </div>

                        <span className={badgeClass(r.status)} style={badgeInlineStyle}>
                          {r.status}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                        <span className="badge" style={pillInlineStyle}>
                          Priority: {r.priority}
                        </span>
                        {r.packagePaid ? (
                          <span className="badge" style={pillInlineStyle}>
                            Paid: {r.packagePaid}
                          </span>
                        ) : null}
                      </div>

                      {r.projectLink ? (
                        <p style={{ marginTop: 12 }}>
                          <a
                            href={r.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono"
                          >
                            {r.projectLink}
                          </a>
                        </p>
                      ) : null}

                      <p className="muted" style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>
                        {isOpen ? r.details : `${r.details}`.slice(0, 120)}
                        {!isOpen && r.details.length > 120 ? "…" : ""}
                      </p>

                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                        <button
                          className="button ghost"
                          type="button"
                          onClick={() => setExpandedId(isOpen ? null : r.id)}
                        >
                          {isOpen ? "Collapse" : "View details"}
                        </button>

                        <button
                          className="button ghost"
                          type="button"
                          onClick={() => setRequestStatus(r.id, "In Progress")}
                        >
                          Mark In Progress
                        </button>

                        <button
                          className="button ghost"
                          type="button"
                          onClick={() => setRequestStatus(r.id, "Done")}
                        >
                          Mark Done
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// Small inline styles so you don’t have to touch CSS right now.
const badgeInlineStyle = {
  fontSize: 12,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  whiteSpace: "nowrap",
};

const pillInlineStyle = {
  fontSize: 12,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  whiteSpace: "nowrap",
};
