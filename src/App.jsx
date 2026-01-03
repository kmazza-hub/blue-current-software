import "./App.css";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";

const services = [
  "React bug fixes & feature completion",
  "Login / signup & JWT authentication",
  "Frontend ↔ backend API integration",
  "Deployment (Netlify, Vercel, Render)",
  "Performance & code cleanup",
];

const whoWeHelp = [
  "Early-stage founders",
  "Small product teams",
  "Solo builders",
  "Agencies needing reliable support",
];

const emailTo = "bluecurrentsoftware@gmail.com";
const baseSubject = "Project Inquiry - Blue Current Software";

// ✅ STRIPE PAYMENT LINKS
const STRIPE_FIX_AND_SHIP_URL = "https://buy.stripe.com/14A7sD52lfH285fav64Vy00";
const STRIPE_FEATURE_BOOST_URL = "https://buy.stripe.com/dRmbIT2Ud8eAdpz9r24Vy01";
const STRIPE_LAUNCH_ASSIST_URL = "https://buy.stripe.com/5kQcMXcuNeCY5X7eLm4Vy02";

const isAuthed = () => {
  const v = localStorage.getItem("bc_user");
  return Boolean(v && v.trim());
};

const buildMailto = ({ subjectSuffix, bodyIntro }) => {
  const subject = subjectSuffix ? `${baseSubject} (${subjectSuffix})` : baseSubject;

  const body =
    `Hi Blue Current Software,\n\n` +
    (bodyIntro ? `${bodyIntro}\n\n` : "") +
    `Project link (if any):\n[URL]\n\n` +
    `What’s stuck / what you want done:\n[Describe here]\n\n` +
    `Timeline:\n[ASAP / This week / This month]\n\n` +
    `Tech stack:\n[React / Node / MongoDB / Deployment]\n\n` +
    `Budget range (optional):\n[ ]\n\n` +
    `Thanks,\n[Your Name]`;

  return `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const defaultMailto = buildMailto({});

const packages = [
  {
    name: "Fix & Ship",
    price: "Starting at $149",
    time: "Same day / 24–48 hours",
    bestFor: "Bug fixes, broken UI, failing builds, small tweaks",
    includes: ["Quick triage + plan", "Fixes shipped + tested", "Short summary of what changed"],
    stripeUrl: STRIPE_FIX_AND_SHIP_URL,
  },
  {
    name: "Feature Boost",
    price: "Starting at $399",
    time: "2–4 days",
    bestFor: "Finish one feature end-to-end",
    includes: ["Frontend + backend integration", "Edge cases + error handling", "Deploy-ready updates"],
    stripeUrl: STRIPE_FEATURE_BOOST_URL,
  },
  {
    name: "Launch Assist",
    price: "Starting at $299",
    time: "1–3 days",
    bestFor: "Deploy, env vars, “works local but not live”",
    includes: ["Deployment setup + troubleshooting", "Env var + build sanity checks", "Post-launch QA pass"],
    stripeUrl: STRIPE_LAUNCH_ASSIST_URL,
  },
];

const work = [
  {
    title: "My Portfolio",
    context: "Personal portfolio showcasing skills and projects.",
    bullets: [
      "Clean, responsive layout structured around key projects",
      "Clear presentation of services and contact flow",
      "Deployed on Netlify",
    ],
    tags: ["React", "Vite", "Netlify"],
    links: [
      { label: "Live site", href: "https://keith-mazza.netlify.app/" },
      { label: "Source code", href: "https://github.com/kmazza-hub/My_portfolio" },
    ],
    emailTopic: "My Portfolio",
  },
  {
    title: "Travel First Bali",
    context: "Travel essentials & weather app with curated tips and API use.",
    bullets: ["Destination-based weather lookup", "Organized travel tips and essentials", "Deployed with Netlify from GitHub"],
    tags: ["React", "APIs", "Netlify"],
    links: [
      { label: "Live site", href: "https://travel-first-bali.netlify.app/" },
      { label: "Source code", href: "https://github.com/kmazza-hub/travel-first" },
    ],
    emailTopic: "Travel First Bali",
  },
  {
    title: "Soothing Baby App",
    context: "Calming content app with React frontend + backend.",
    bullets: ["Feature-driven UI designed for quick, parent-friendly use", "Responsive layout and simple flows", "Frontend + backend repos available"],
    tags: ["React", "Node", "Express", "MongoDB"],
    links: [
      { label: "Live site", href: "https://soothingbabyapp.netlify.app/" },
      { label: "Frontend code", href: "https://github.com/kmazza-hub/soothing-baby-app" },
      { label: "Backend code", href: "https://github.com/kmazza-hub/soothing-baby-backend" },
    ],
    emailTopic: "Soothing Baby App",
  },
];

// --- Guards that cannot bounce forever ---
function Protected({ children }) {
  const location = useLocation();
  if (isAuthed()) return children;

  // already at /login? don't spam navigate
  if (location.pathname === "/login") return children;

  return <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  const location = useLocation();
  if (!isAuthed()) return children;

  // already at /dashboard? don't spam navigate
  if (location.pathname === "/dashboard") return children;

  return <Navigate to="/dashboard" replace />;
}

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logoImageWrap">
          <img src="/blue-current-logo.png" alt="Blue Current Software logo" className="logoImage" />
        </div>
        <div>
          <div className="name">Blue Current Software</div>
          <div className="tagline">Always in motion.</div>
        </div>
      </div>

      <nav className="nav">
        <a href="#services">Services</a>
        <a href="#packages">Packages</a>
        <a href="#work">Work</a>
        <a href="#how">How we work</a>
        <a href="#contact" className="navCta">Contact</a>

        <Link to={isAuthed() ? "/dashboard" : "/login"} className="navCta">
          Portal
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Blue Current Software. Always in motion.</div>
    </footer>
  );
}

function MainSite() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <h1>Helping founders and small teams ship with confidence.</h1>
          <p className="sub">
            We fix bugs, finish features, and deploy React + Node.js apps when projects are stuck,
            broken, or close to launch.
          </p>

          <div className="heroCtas">
            <a className="button primary" href="#contact">Get it moving</a>
            <a className="button ghost" href="#packages">View packages</a>
          </div>

          <div className="heroBadges" aria-label="Core capabilities">
            <span>React</span><span>Node.js</span><span>Express</span><span>MongoDB</span><span>Deployments</span><span>Stripe</span>
          </div>
        </section>

        <section className="section" id="services">
          <h2>Services</h2>
          <div className="grid">
            {services.map((s) => (
              <div key={s} className="card">
                <h3>{s}</h3>
                <p>Clear scope, clean implementation, and practical solutions that keep your product moving forward.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="packages">
          <div className="sectionHeader">
            <h2>Packages</h2>
            <p className="muted">
              Budget-friendly starting rates. Fast turnaround. Clear scope. Pay securely via Stripe
              for standard packages, or request an invoice for custom work.
            </p>
          </div>

          <div className="pkgGrid">
            {packages.map((p) => (
              <div key={p.name} className="pkgCard">
                <div className="pkgTop">
                  <h3>{p.name}</h3>
                  <div className="pkgPrice">{p.price}</div>
                  <div className="pkgMeta">{p.time}</div>
                </div>

                <p className="muted pkgBestFor">
                  <strong>Best for:</strong> {p.bestFor}
                </p>

                <ul className="pkgList">
                  {p.includes.map((i) => <li key={i}>{i}</li>)}
                </ul>

                <div className="pkgCtas">
                  <a className="button primary" href={p.stripeUrl} target="_blank" rel="noopener noreferrer">
                    Pay with Stripe
                  </a>

                  <a
                    className="button ghost"
                    href={buildMailto({
                      subjectSuffix: p.name,
                      bodyIntro: `I’m interested in the ${p.name} package. Please confirm scope and next steps.`,
                    })}
                  >
                    Request invoice / scope
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="finePrint pkgFine">*Starting prices depend on scope. You’ll always get a clear plan before work begins.</p>
        </section>

        <section className="section" id="work">
          <div className="sectionHeader">
            <h2>Selected work</h2>
            <p className="muted">Live examples—clean UX, stable systems, and smooth deployments.</p>
          </div>

          <div className="workGrid">
            {work.map((p) => (
              <div key={p.title} className="workCard">
                <div className="workTop">
                  <h3>{p.title}</h3>
                  <p className="muted">{p.context}</p>
                </div>

                <ul className="workList">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>

                <div className="tagRow" aria-label="Tech tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>

                <div className="workCtaRow">
                  {p.links.map((link) => (
                    <a key={link.href} className="button ghost" href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ))}

                  <a
                    className="button primary"
                    href={buildMailto({
                      subjectSuffix: `Question about ${p.emailTopic}`,
                      bodyIntro: `I’m reaching out about the ${p.title}.`,
                    })}
                  >
                    Email about this
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="how">
          <h2>How we work</h2>
          <div className="twoCol">
            <div className="card">
              <h3>Calm, clear, and direct</h3>
              <p>We communicate early and often. No surprises, no over-engineering—just steady progress.</p>
              <ul className="list">
                <li>Fast triage and honest estimates</li>
                <li>Maintainable code over quick hacks</li>
                <li>Momentum-first delivery</li>
              </ul>
            </div>

            <div className="card">
              <h3>Who we help</h3>
              <p>We’re a great fit for teams that want reliability and speed without chaos.</p>
              <ul className="list">{whoWeHelp.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section manifesto" aria-label="Manifesto">
          <h2>Our philosophy</h2>
          <p>
            Progress comes from movement—not perfection. We help teams move forward when projects
            stall, systems break, or ideas feel just out of reach.
          </p>
          <p className="emphasis">Always in motion.</p>
        </section>

        <section className="section" id="contact">
          <h2>Contact</h2>
          <p className="sub">Send us an email and we’ll reply quickly.</p>

          <div className="form">
            <div className="heroCtas" style={{ marginTop: 0 }}>
              <a className="button primary" href={defaultMailto}>Email Blue Current</a>
              <a className="button ghost" href={`mailto:${emailTo}`}>Open blank email</a>
            </div>

            <p className="finePrint">
              Email:{" "}
              <a href={`mailto:${emailTo}`} className="mono">{emailTo}</a>
            </p>

            <p className="finePrint">
              Payments for standard packages are processed securely via Stripe. For custom scope, we send a one-time Stripe invoice.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<MainSite />} />

        <Route
          path="/login"
          element={
            <PublicOnly>
              <Login />
            </PublicOnly>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/dashboard/new"
          element={
            <Protected>
              <NewRequest />
            </Protected>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
