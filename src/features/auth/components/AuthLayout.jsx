import AuthHeader from "./AuthHeader";
import "../styles/auth-layout.css";

function AuthLayout({ children, }) {
    return (
        <div className="auth-layout">
            <AuthHeader />
            <main className="auth-content">
                {children}
            </main>
        </div>
    );
}

export default AuthLayout;