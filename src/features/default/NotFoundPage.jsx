import { useNavigate } from "react-router-dom";
import "./not-found.css";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="nf-root">
            <span className="nf-code">404</span>
            <div className="nf-divider" />
            <h1 className="nf-title">Page not found</h1>
            <p className="nf-sub">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <button className="nf-btn" onClick={() => navigate("/dashboard")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Go back home
            </button>
        </div>
    );
}

export default NotFoundPage;