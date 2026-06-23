import { Link } from "react-router-dom";
import "../styles/auth-layout.css";

function AuthHeader() {
    return (
        <header className="auth-header">
            <Link
                to="/"
                className="auth-brand"
            >
                <div className="auth-logo">
                    <img src="/logo-apis.png" alt="" />
                </div>
                <span>Apis</span>
            </Link>
            <Link
                to="/signup"
                className="auth-switch"
            >
                Sign up
            </Link>
        </header>
    );
}

export default AuthHeader;