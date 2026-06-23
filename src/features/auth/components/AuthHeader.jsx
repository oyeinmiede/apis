import { Link } from "react-router-dom";
import "../styles/auth-layout.css";

function AuthHeader({ mode }) {
    const isLogin = mode === "login"
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
                to={isLogin ? "/signup" : "/login"}
                className="auth-switch"
            >
                {isLogin
                    ? "Sign up"
                    : "Sign in"}
            </Link>
        </header>
    );
}

export default AuthHeader;