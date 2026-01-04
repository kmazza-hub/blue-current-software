import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { addRequest } from "../utils/requests";

// ✅ STRIPE PAYMENT LINKS (Stripe → Payment Links → Copy link)
const STRIPE_FIX_AND_SHIP_URL = "https://buy.stripe.com/14A7sD52lfH285fav64Vy00";
const STRIPE_FEATURE_BOOST_URL = "https://buy.stripe.com/dRmbIT2Ud8eAdpz9r24Vy01";
const STRIPE_LAUNCH_ASSIST_URL = "https://buy.stripe.com/5kQcMXcuNeCY5X7eLm4Vy02";

const PACKAGE_OPTIONS = [
  { label: "Fix & Ship", value: "Fix & Ship", url: STRIPE_FIX_AND_SHIP_URL, hint: "Bug fix + deploy support." },
  { label: "Feature Boost", value: "Feature Boost", url: STRIPE_FEATURE_BOOST_URL, hint: "Finish a feature fast." },
  { label: "Launch Assist", value: "Launch Assist", url: STRIPE_LAUNCH_ASSIST_URL, hint: "Prep, stabilize, ship." },
];

const TYPES = ["Fix & Ship", "Feature Boost", "Launch Assist", "Other"];
const PRIORITIES = ["Low", "Normal", "High", "Urgent"];

const getUserEmail = () => localStorage.getItem("bc_user") || "";

const newId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function NewRequest() {
  const navigate = useNavigate();
  const email = getUserEmail();

  const [params] = useSearchParams();

  // Accept either ?paid= or ?package=
  const paidFromUrl = params.get("paid") || params.get("package") || "";

  const normalizedPaidFromUrl = useMemo(() => {
    const v = decodeURIComponent(paidFromUrl || "").trim();
    if (!v) return "";
    const match = PACKAGE_OPTIONS.find((p) => p.value === v);
    return match ? match.value : "";
  }, [paidFromUrl]);

  // Pull from localStorage (used when user had to login first)
  const paidFromStorage = useMemo(() => {
    const v = (localStorage.getItem("bc_paid_package") || "").trim();
    const match = PACKAGE_OPTIONS.find((p) => p.value === v);
    return match ? match.value : "";
  }, []);

  // Choose best initial package
  const initialPackage = normalizedPaidFromUrl || paidFromStorage || "";

  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [type, setType] = useState(initialPackage || "Fix & Ship");
  const [priority, setPriority] = useState("Normal");
  const [projectLink, setProjectLink] = useState("");
  const [details, setDetails] = useState("");

  const packageObj = PACKAGE_OPTIONS.find((p) => p.value === selectedPackage) || null;

  // ✅ Persist paid package so it survives login / refresh
  useEffect(() => {
    if (normalizedPaidFromUrl) {
      localStorage.setItem("bc_paid_package", normalizedPaidFromUrl);
      setSelectedPackage(normalizedPaidFromUrl);
      if (TYPES.includes(normalizedPaidFromUrl)) setType(normalizedPaidFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedPaidFromUrl]);

  // Keep type aligned when package changes (unless user chooses Other)
  useEffect(() => {
    if (selectedPackage && TYPES.includes(selectedPackage)) {
      setType(selectedPackage);
    }
  }, [selectedPackage]);

  const canSubmit = type && priority && details.trim().length >= 10;

  const handlePayAndStart = () => {
    if (!packageObj) return;
    window.open(packageObj.url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const request = {
      id: newId(),
      type,
      priority,
      projectLink: projectLink.trim(),
      details: details.trim(),
      status: "Submitted",
      createdAt: new Date().toISOString(),
      packagePaid: selectedPackage || localStorage.getItem("bc_paid_package") || null,
    };

    addRequest(email, request);

    // Optional: clear stored paid package after a successful submission
    localStorage.removeItem("bc_paid_package");

    navigate("/dashboard", { replace: true });
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
            <div className="tagline">Client Portal</div>
          </div>
        </div>

        <nav className="nav">
          <Link to="/dashboard" className="navCta">
            Back to dashboard
          </Link>
          <Link to="/" className="navCta">
            Back to site
          </Link>
        </nav>
      </div>

      <main>
        <section className="section" style={{ paddingTop: 32 }}>
          <h2>New Request</h2>
          <p className="muted">
            Logged in as {email}. Choose what you need, pay if needed, and submit your request.
          </p>

          {/* ✅ Dropdown Intake */}
          <div className="card" style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 6 }}>Start with a package</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              Select a service package. You can pay now, then submit your details below.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              <label>
                Package
                <select
                  value={selectedPackage}
                  onChange={(e) => {
                    const next = e.target.value;
                    setSelectedPackage(next);

                    if (next) localStorage.setItem("bc_paid_package", next);
                    else localStorage.removeItem("bc_paid_package");
                  }}
                >
                  <option value="">Select a package…</option>
                  {PACKAGE_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>

              {packageObj ? (
                <div className="muted" style={{ fontSize: 14 }}>
                  {packageObj.hint}
                </div>
              ) : (
                <div className="muted" style={{ fontSize: 14 }}>
                  You can also skip payment and just submit a request below.
                </div>
              )}

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  className="button primary"
                  type="button"
                  onClick={handlePayAndStart}
                  disabled={!packageObj}
                  title={!packageObj ? "Select a package first" : "Open Stripe checkout"}
                >
                  Pay & Start
                </button>

                {packageObj ? (
                  <a className="button ghost" href={packageObj.url} target="_blank" rel="noreferrer">
                    Open checkout link
                  </a>
                ) : null}
              </div>

              <p className="finePrint" style={{ marginTop: 6 }}>
                After payment, return here and submit the request details below. Your dashboard will show the package next to the request.
              </p>
            </div>
          </div>

          {/* ✅ Request Form */}
          <form className="form" onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <label>
              Request type
              <select value={type} onChange={(e) => setType(e.target.value)} required>
                {TYPES.map((t) => (
                  <option value={t} key={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Priority
              <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                {PRIORITIES.map((p) => (
                  <option value={p} key={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Project link (GitHub / live site / Loom)
              <input
                type="url"
                inputMode="url"
                placeholder="https://github.com/... or https://yourapp.netlify.app"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
            </label>

            <label>
              What do you need help with?
              <textarea
                rows="7"
                placeholder={
                  "What’s broken or missing?\nWhat should it do instead?\nAny errors, screenshots, or steps to reproduce?\n\nThe more specific, the faster we ship."
                }
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </label>

            {selectedPackage ? (
              <p className="finePrint" style={{ marginTop: -6 }}>
                Package selected: <span className="mono">{selectedPackage}</span>
              </p>
            ) : null}

            <button className="button primary" type="submit" disabled={!canSubmit}>
              Submit request
            </button>

            <p className="finePrint">
              Tip: include steps to reproduce, expected result, and any console errors.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
