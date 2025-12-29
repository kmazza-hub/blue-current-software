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

const emailTo = "bluecurrentsoftware@gmail.com";

const emailSubject = "Project Inquiry - Blue Current Software";
const emailBody =
  "Hi Blue Current Software,%0D%0A%0D%0A" +
  "I need help with:%0D%0A%0D%0A" +
  "[Describe your project here]%0D%0A%0D%0A" +
  "Timeline:%0D%0A" +
  "[e.g., ASAP / This week / This month]%0D%0A%0D%0A" +
  "Tech stack:%0D%0A" +
  "[e.g., React / Node / MongoDB / Deployment]%0D%0A%0D%0A" +
  "Thanks,%0D%0A" +
  "[Your Name]";

const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(
  emailSubject
)}&body=${emailBody}`;

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
            <a className="button ghost" href="#services">
              See services
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
          <p className="sub">
            Send us an email and we’ll reply quickly. No forms, no friction.
          </p>

          {/* Button-style contact (no "not secure" warning) */}
          <div className="form">
            <div className="heroCtas" style={{ marginTop: 0 }}>
              <a className="button primary" href={mailtoLink}>
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
