import {
    Sparkles,
    Users,
    LayoutGrid,
    Briefcase,
    GraduationCap,
    Palette,
    Check,
    Moon,
    Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function LandingPage() {
    const navigate = useNavigate()
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(prev =>
            prev === "dark"
                ? "light"
                : "dark"
        );
    }

    return (
        <div className="lp">

            <nav className="nav">

                <div className="nav-logo">
                    <img src="/logo-apis.png" alt="Apis" />
                    <span>Apis</span>
                </div>

                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#templates">Templates</a>
                    <a href="#pricing">Pricing</a>
                </div>

                <div className="landing-nav-right">

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                    >
                        {theme === "dark"
                            ? <Sun size={18} />
                            : <Moon size={18} />
                        }
                    </button>

                    <button
                        className="nav-cta"
                        onClick={() => navigate("/login")}
                    >
                        Get Started Free
                    </button>

                </div>

            </nav>

            <section className="hero">

                <div className="hero-badge">
                    <span>Free</span>
                    — no credit card needed
                </div>

                <h1>
                    Think together.
                    <br />
                    <em>Build visually.</em>
                </h1>

                <p>
                    A collaborative canvas for teams, students, and creatives.
                    Sketch ideas, map workflows, and build better — together.
                </p>

                <div className="hero-actions">

                    <Link
                        to="/signup"
                        className="btn-primary"
                    >
                        Start for free
                    </Link>

                    <button className="btn-ghost">
                        See it in action
                    </button>

                </div>

                <div className="canvas-preview">

                    <div className="canvas-bar">

                        <div
                            className="dot"
                            style={{ background: "#E24B4A" }}
                        />

                        <div
                            className="dot"
                            style={{ background: "#EF9F27" }}
                        />

                        <div
                            className="dot"
                            style={{ background: "#639922" }}
                        />

                        <span
                            style={{
                                fontSize: 12,
                                color: "var(--text-secondary)",
                                marginLeft: 8,
                            }}
                        >
                            Apis • Product Roadmap
                        </span>

                    </div>

                    <div className="canvas-body">

                        <div className="c-sticky c-sticky-y">
                            <strong>Research</strong>
                            <br />
                            User interviews
                        </div>

                        <div className="c-sticky c-sticky-b">
                            <strong>Design</strong>
                            <br />
                            Wireframes
                        </div>

                        <div className="c-sticky c-sticky-g">
                            <strong>Launch</strong>
                            <br />
                            Beta release
                        </div>

                        <div
                            className="c-rect"
                            style={{
                                width: 100,
                                height: 44,
                                left: 24,
                                top: 200,
                            }}
                        >
                            Milestone 1
                        </div>

                        <div
                            className="c-rect"
                            style={{
                                width: 100,
                                height: 44,
                                left: 145,
                                top: 200,
                            }}
                        >
                            Milestone 2
                        </div>

                        <div
                            className="c-rect"
                            style={{
                                width: 100,
                                height: 44,
                                left: 266,
                                top: 200,
                            }}
                        >
                            Milestone 3
                        </div>

                        <div
                            className="c-line"
                            style={{
                                width: 40,
                                left: 124,
                                top: 222,
                            }}
                        />

                        <div
                            className="c-line"
                            style={{
                                width: 40,
                                left: 245,
                                top: 222,
                            }}
                        />

                        <div className="avatar-row">

                            <div className="avatar av1">JK</div>
                            <div className="avatar av2">MR</div>
                            <div className="avatar av3">TS</div>

                            <div className="live-badge">
                                <div className="live-dot" />
                                3 online
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section
                id="features"
                className="features"
            >

                <div className="feature-card">
                    <div className="feature-icon">
                        <LayoutGrid size={20} />
                    </div>

                    <h3>Infinite canvas</h3>

                    <p>
                        Draw, write, place sticky notes, shapes, and arrows on a canvas that never runs out of space.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <Users size={20} />
                    </div>

                    <h3>Real-time collaboration</h3>

                    <p>
                        Invite your team to any board. Everyone sees changes live — no refresh, no lag, no confusion.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <Sparkles size={20} />
                    </div>

                    <h3>Meet Hexa</h3>

                    <p>
                        Let Hexa, your AI collaborator, generate diagrams, brainstorm ideas, and help you think faster.
                    </p>
                </div>

            </section>

            <section className="audience">

                <div className="section-label">
                    Who it's for
                </div>

                <h2>
                    Built for people who think visually.
                </h2>

                <div className="audience-grid">

                    <div className="audience-card">
                        <div className="audience-icon">
                            <Briefcase />
                        </div>

                        <h4>Teams</h4>

                        <p>
                            Run standups, plan sprints, map out strategy — all in one shared space your whole team can see.
                        </p>
                    </div>

                    <div className="audience-card">
                        <div className="audience-icon">
                            <GraduationCap />
                        </div>

                        <h4>Students</h4>

                        <p>
                            Study groups, project planning, mind maps. Apis keeps your ideas organized and your team aligned.
                        </p>
                    </div>

                    <div className="audience-card">
                        <div className="audience-icon">
                            <Palette />
                        </div>

                        <h4>Creatives</h4>

                        <p>
                            Mood boards, concept maps, design critiques. A canvas that keeps up with how your brain works.
                        </p>
                    </div>

                </div>

            </section>

            <section class="templates" id="templates">
                <div class="section-label">Templates</div>
                <h2>Start fast with a template</h2>
                <p>Jump in with a ready-made layout — then make it your own.</p>
                <div class="template-grid">
                    <div class="template-card">
                        <div class="template-thumb t-amber">
                            <svg width="120" height="80" viewBox="0 0 120 80">
                                <rect x="10" y="10" width="44" height="28" rx="4" fill="#EF9F27" fill-opacity=".3" stroke="#BA7517" stroke-width="0.5" />
                                <rect x="66" y="10" width="44" height="28" rx="4" fill="#EF9F27" fill-opacity=".3" stroke="#BA7517" stroke-width="0.5" />
                                <rect x="10" y="46" width="44" height="28" rx="4" fill="#EF9F27" fill-opacity=".3" stroke="#BA7517" stroke-width="0.5" />
                                <rect x="66" y="46" width="44" height="28" rx="4" fill="#EF9F27" fill-opacity=".3" stroke="#BA7517" stroke-width="0.5" />
                            </svg>
                        </div>
                        <div class="template-info">
                            <h4>Kanban board</h4>
                            <p>To-do, in progress, done</p>
                        </div>
                    </div>
                    <div class="template-card">
                        <div class="template-thumb t-blue">
                            <svg width="120" height="80" viewBox="0 0 120 80">
                                <rect x="50" y="8" width="20" height="16" rx="3" fill="#85B7EB" fill-opacity=".5" stroke="#378ADD" stroke-width="0.5" />
                                <line x1="60" y1="24" x2="30" y2="38" stroke="#378ADD" stroke-width="1" />
                                <line x1="60" y1="24" x2="60" y2="38" stroke="#378ADD" stroke-width="1" />
                                <line x1="60" y1="24" x2="90" y2="38" stroke="#378ADD" stroke-width="1" />
                                <rect x="15" y="38" width="28" height="14" rx="3" fill="#85B7EB" fill-opacity=".5" stroke="#378ADD" stroke-width="0.5" />
                                <rect x="46" y="38" width="28" height="14" rx="3" fill="#85B7EB" fill-opacity=".5" stroke="#378ADD" stroke-width="0.5" />
                                <rect x="77" y="38" width="28" height="14" rx="3" fill="#85B7EB" fill-opacity=".5" stroke="#378ADD" stroke-width="0.5" />
                                <line x1="29" y1="52" x2="29" y2="62" stroke="#378ADD" stroke-width="1" />
                                <rect x="15" y="62" width="28" height="12" rx="3" fill="#85B7EB" fill-opacity=".3" stroke="#378ADD" stroke-width="0.5" />
                            </svg>
                        </div>
                        <div class="template-info">
                            <h4>Mind map</h4>
                            <p>Branch out your ideas</p>
                        </div>
                    </div>
                    <div class="template-card">
                        <div class="template-thumb t-teal">
                            <svg width="120" height="80" viewBox="0 0 120 80">
                                <rect x="10" y="16" width="30" height="20" rx="4" fill="#5DCAA5" fill-opacity=".4" stroke="#1D9E75" stroke-width="0.5" />
                                <line x1="40" y1="26" x2="50" y2="26" stroke="#1D9E75" stroke-width="1" marker-end="url(#a)" />
                                <rect x="50" y="16" width="20" height="20" rx="4" fill="#5DCAA5" fill-opacity=".4" stroke="#1D9E75" stroke-width="0.5" />
                                <line x1="70" y1="26" x2="80" y2="26" stroke="#1D9E75" stroke-width="1" />
                                <rect x="80" y="16" width="30" height="20" rx="4" fill="#5DCAA5" fill-opacity=".4" stroke="#1D9E75" stroke-width="0.5" />
                                <line x1="60" y1="36" x2="60" y2="46" stroke="#1D9E75" stroke-width="1" />
                                <rect x="42" y="46" width="36" height="18" rx="4" fill="#5DCAA5" fill-opacity=".25" stroke="#1D9E75" stroke-width="0.5" />
                            </svg>
                        </div>
                        <div class="template-info">
                            <h4>Flowchart</h4>
                            <p>Map any process or system</p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="pricing"
                className="pricing"
            >

                <div className="section-label">
                    Pricing
                </div>

                <h2>
                    Free while we're building.
                </h2>

                <p>
                    No tiers, no paywalls. Everything is free right now — enjoy it.
                </p>

                <div className="price-card">

                    <div className="price-amount">
                        $0
                        <span> / forever (for now)</span>
                    </div>

                    <p className="price-desc">
                        Full access. No credit card. No catch.
                    </p>

                    <ul className="price-features">

                        <li>
                            <Check size={16} color="#ffc107" />
                            Unlimited boards
                        </li>

                        <li>
                            <Check size={16} color="#ffc107" />
                            Unlimited workspaces
                        </li>

                        <li>
                            <Check size={16} color="#ffc107" />
                            Real-time collaboration
                        </li>

                        <li>
                            <Check size={16} color="#ffc107" />
                            All drawing tools
                        </li>

                        <li>
                            <Check size={16} color="#ffc107" />
                            AI with Hexa
                        </li>

                        <li>
                            <Check size={16} color="#ffc107" />
                            Templates
                        </li>

                    </ul>

                    <Link
                        to="/signup"
                        className="btn-primary"
                        style={{
                            display: "block",
                            textAlign: "center",
                        }}
                    >
                        Get Started Free
                    </Link>

                </div>

            </section>

            <section className="cta-section">

                <h2>
                    Your next big idea starts on a{" "}
                    <em>blank canvas.</em>
                </h2>

                <p>
                    Get your team on Apis today — it takes less than a minute.
                </p>

                <Link
                    to="/signup"
                    className="btn-primary"
                >
                    Start for free
                </Link>

            </section>

            <footer className="footer">

                <div className="footer-logo">
                    <img src="/logo-apis.png" alt="Apis" />
                    <span>Apis</span>
                </div>

                <span className="copy">
                    &copy; {new Date().getFullYear()} <a target="_blank" href="https://gabrielleduere.vercel.app">Gabrielle Duere</a>
                </span>

                <p>
                    Made for teams who think together.
                </p>

            </footer>

        </div>
    );
}

export default LandingPage;