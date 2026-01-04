import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Paid() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pkg = params.get("package") || "your package";

  // Save paid package so it persists through login redirects
  useEffect(() => {
    try {
      localStorage.setItem("bc_paid_package", pkg);
    } catch {
      // ignore storage errors
    }
  }, [pkg]);

  const isAuthed = () => {
    const v = localStorage.getItem("bc_user");
    return Boolean(v && v.trim());
  };

  const handleContinue = () => {
    const target = `/dashboard/new?paid=${encodeURIComponent(pkg)}`;

    if (isAuthed()) {
      navigate(target);
      return;
    }

    // Not logged in -> send to login, and keep the target so you can route back after login
    navigate(`/login?returnTo=${encodeURIComponent(target)}`);
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
            <div className="tagline">Payment confirmed</div>
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className="navCta">
            Back to site
          </Link>
        </nav>
      </div>

      <main>
        <section className="section" style={{ paddingTop: 36 }}>
          <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 style={{ marginTop: 0 }}>You’re all set ✅</h2>

            <p className="muted">
              Payment received for <span className="mono">{pkg}</span>.
            </p>

            <div style={{ marginTop: 16 }}>
              <p>
                Next step: submit your intake details so we can start fast with zero back-and-forth.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <button className="button primary" type="button" onClick={handleContinue}>
                Continue to intake
              </button>

              <Link className="button ghost" to="/dashboard">
                Go to dashboard
              </Link>
            </div>

            <p className="finePrint" style={{ marginTop: 14 }}>
              If you don’t see your dashboard, make sure you’re logged in.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
