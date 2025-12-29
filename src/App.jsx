import "./App.css";

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

const work = [
  {
    title: "Soothing Baby App (MERN + Auth)",
    context: "Capstone build focused on calm UX, embeds, and auth flows.",
    bullets: [
      "JWT auth (signup/signin), protected routes, user context",
      "Feature modules: favorites, uploads, timers, responsive UI",
      "Deployment-ready structure and API integration patterns",
    ],
    tags: ["React", "Node", "Express", "MongoDB", "JWT"],
    linkLabel: "Request a walkthrough",
    href: "#contact",
  },
  {
    title: "Travel Essentials App (Vite + APIs)",
    context: "Fast destination lookup + curated travel tips experience.",
    bullets: [
      "Weather lookup by destination",
      "Clean card-based UI with strong visual hierarchy",
      "Deployed with Netlify and production build pipeline",
    ],
    tags: ["React", "Vite", "APIs", "Netlify"],
    linkLabel: "Request a walkthrough",
    href: "#contact",
  },
  {
    title: "Bug Fix & Deploy Rescue (Typical Engagement)",
    context: "The kind of work we do most often for founders.",
    bullets: [
      "Triage issues, fix broken UI / API calls, and stabilize releases",
      "Ship missing features without over-engineering",
      "Deploy to Netlify/Vercel/Render with env + build sanity checks",
    ],
    tags: ["React", "Debugging", "Deployments"],
    linkLabel: "Get help like this",
    href: "#contact",
  },
];

const packages = [
  {
    name: "Fix & Ship",
    price: "Starting at $149",
    time: "Same day / 24–48 hours",
    bestFor: "Bug fixes, broken UI, failing builds, small tweaks",
    includes: [
      "Quick triage + plan",
      "Fixes shipped + tested",
      "Short summary of what changed",
    ],
  },
  {
    name: "Feature Boost",
    price: "Starting at $399",
    time: "2–4 days",
    bestFor: "Finish one feature end-to-end",
    includes: [
      "Frontend + backend integration",
      "Edge cases + error handling",
      "Deploy-ready updates",
    ],
  },
  {
    name: "Launch Assist",
    price: "Starting at $299",
    time: "1–3 days",
    bestFor: "Deploy, env vars, “works local but not live”",
    includes: [
      "Deployment setup + troubleshooting",
      "Env var + build sanity checks",
      "Post-launch QA pass",
    ],
  },
];

const emailTo = "bluecurrentsoftware@gmail.com";
const baseSubject = "Project Inquiry - Blue Current Software";

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

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <div className="logo" aria-hidden="true">
            🌊
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
          <a href="#contact" className="navCta">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Helping founders and small teams ship with confidence.</h1>
          <p className="sub">
            We fix bugs, finish features, and deploy React + Node.js apps when projects are stuck,
            broken, or close to launch.
          </p>

          <div className="heroCtas">
            <a className="button primary" href="#contact">
              Get it moving
            </a>
            <a className="button ghost" href="#packages">
              View packages
            </a>
          </div>

          <div className="heroBadges" aria-label="Core capabilities">
            <span>React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
            <span>Deployments</span>
          </div>
        </section>

        <section className="section" id="services">
          <h2>Services</h2>
          <div className="grid">
            {services.map((s) => (
              <div key={s} className="card">
                <h3>{s}</h3>
                <p>
                  Clear scope, clean implementation, and practical solutions that keep your product
                  moving forward.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="section" id="packages">
          <div className="sectionHeader">
            <h2>Packages</h2>
            <p className="muted">
              Budget-friendly starting rates. Fast turnaround. Clear scope. If you’re stuck, we’ll
              get it moving.
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
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>

                <div className="pkgCtas">
                  <a
                    className="button primary"
                    href={buildMailto({
                      subjectSuffix: p.name,
                      bodyIntro: `I’m interested in the ${p.name} package.`,
                    })}
                  >
                    Choose {p.name}
                  </a>
                  <a className="button ghost" href="#contact">
                    Ask a question
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="finePrint pkgFine">
            *Starting prices depend on scope. You’ll always get a clear plan before work begins.
          </p>
        </section>

        {/* Work */}
        <section className="section" id="work">
          <div className="sectionHeader">
            <h2>Selected work</h2>
            <p className="muted">
              A few examples of the kind of work we deliver—clean UX, stable systems, and real
              momentum.
            </p>
          </div>

          <div className="workGrid">
            {work.map((p) => (
              <div key={p.title} className="workCard">
                <div className="workTop">
                  <h3>{p.title}</h3>
                  <p className="muted">{p.context}</p>
                </div>

                <ul className="workList">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="tagRow" aria-label="Tech tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="workCta">
                  <a className="button ghost" href={defaultMailto}>
                    Request details
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
              <p>
                We communicate early and often. No surprises, no over-engineering—just steady
                progress.
              </p>
              <ul className="list">
                <li>Fast triage and honest estimates</li>
                <li>Maintainable code over quick hacks</li>
                <li>Momentum-first delivery</li>
              </ul>
            </div>

            <div className="card">
              <h3>Who we help</h3>
              <p>We’re a great fit for teams that want reliability and speed without chaos.</p>
              <ul className="list">
                {whoWeHelp.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section manifesto" aria-label="Manifesto">
          <h2>Our philosophy</h2>
          <p>
            Progress comes from movement—not perfection. We help teams move forward when projects
            stall, systems break, or ideas feel just out of reach. Through calm problem-solving,
            thoughtful engineering, and continuous improvement, we bring momentum back to software
            that matters.
          </p>
          <p className="emphasis">Always in motion.</p>
        </section>

        <section className="section" id="contact">
          <h2>Contact</h2>
          <p className="sub">Send us an email and we’ll reply quickly.</p>

          <div className="form">
            <div className="heroCtas" style={{ marginTop: 0 }}>
              <a className="button primary" href={defaultMailto}>
                Email Blue Current
              </a>
              <a className="button ghost" href={`mailto:${emailTo}`}>
                Open blank email
              </a>
            </div>

            <p className="finePrint">
              Email:{" "}
              <a href={`mailto:${emailTo}`} className="mono">
                {emailTo}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Blue Current Software. Always in motion.</div>
      </footer>
    </div>
  );
}
