import { useMemo, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

const EMAIL_TO = "bluecurrentsoftware@gmail.com";

function buildMailto({ fromEmail, title, category, priority, deadline, details }) {
  const subject = `New Client Request (${category})`;
  const bodyLines = [
    `From: ${fromEmail}`,
    ``,
    `Title: ${title}`,
    `Category: ${category}`,
    `Priority: ${priority}`,
    `Preferred deadline: ${deadline || "Not specified"}`,
    ``,
    `Details:`,
    details,
  ];

  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join("\n")
  )}`;
}

export default function NewRequest() {
  const navigate = useNavigate();
  const email = (localStorage.getItem("bc_user") || "").trim();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bug Fix");
  const [priority, setPriority] = useState("Normal");
  const [deadline, setDeadline] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!email) return <Navigate to="/login" replace />;

  const trimmedTitle = title.trim();
  const trimmedDetails = details.trim();

  const isValid = useMemo(() => {
    return trimmedTitle.length >= 4 && trimmedDetails.length >= 20;
  }, [trimmedTitle, trimmedDetails]);

  const detailsCount = details.length;
  const detailsHint =
    detailsCount < 20
      ? `Add a little more detail (${20 - detailsCount} more characters).`
      : "Good detail — thank you.";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    // Save request
    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(`bc_requests_${email}`)) || [];
    } catch {
      existing = [];
    }

    const request = {
      title: trimmedTitle,
      category,
      priority,
      deadline: deadline || null,
      details: trimmedDetails,
      createdAt: new Date().toISOString(),
      status: "Submitted",
    };

    existing.push(request);
    localStorage.setItem(`bc_requests_${email}`, JSON.stringify(existing));

    // Queue one-time email compose on Dashboard
    const mailto = buildMailto({
      fromEmail: email,
      title: request.title,
      category: request.category,
      priority: request.priority,
      deadline: request.deadline,
      details: request.details,
    });

    sessionStorage.setItem("bc_open_mailto_once", mailto);

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="page">
      <div className="form" style={{ maxWidth: 760, margin: "60px auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <h2 style={{ marginBottom: 6 }}>Submit a new request</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              Share what you need — we’ll review it and reply quickly with next steps.
            </p>
          </div>

          <Link className="button ghost" to="/dashboard">
            Back to dashboard
          </Link>
        </div>

        {/* Info strip */}
        <div
          className="card"
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 14,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <span className="muted">Logged in as:</span>
            <span className="mono">{email}</span>
          </div>

          <div className="muted" style={{ marginTop: 10, lineHeight: 1.4 }}>
            <strong>What happens next:</strong> after you submit, your email client will open with a pre-filled message.
            Send it, and we’ll confirm scope + timeline.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
          {/* Title */}
          <label>
            Request title <span className="muted">(short + clear)</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Login button stuck / Stripe link not opening / Deploy failing on Netlify"
              maxLength={80}
            />
          </label>

     {/* Two-column row */}
<div className="formRowTwo">
  <label>
    Category
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option>Bug Fix</option>
      <option>Feature</option>
      <option>Deployment</option>
      <option>Other</option>
    </select>
  </label>

  <label>
    Priority
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option>Low</option>
      <option>Normal</option>
      <option>High</option>
      <option>Urgent</option>
    </select>
  </label>
</div>


          {/* Deadline */}
          <label style={{ marginTop: 12 }}>
            Preferred deadline <span className="muted">(optional)</span>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>

          {/* Details */}
          <label style={{ marginTop: 12 }}>
            Details <span className="muted">(what’s broken + what “done” looks like)</span>
            <textarea
              rows="6"
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={
                "What’s happening?\nWhat did you expect instead?\nAny errors / screenshots?\nLink to repo or live site?"
              }
            />
          </label>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8 }}>
            <div className="muted">{detailsHint}</div>
            <div className="muted">{detailsCount}/800</div>
          </div>

          {/* Actions */}
          <div className="heroCtas" style={{ marginTop: 18 }}>
            <button className="button primary" type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit request"}
            </button>

            <Link className="button ghost" to="/dashboard">
              Cancel
            </Link>
          </div>

          {!isValid && (
            <p className="muted" style={{ marginTop: 12 }}>
              Tip: add a clearer title and at least a couple sentences of details so we can scope quickly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
