import AuthHeader from "./AuthHeader";
import "../styles/auth-layout.css";

function AuthLayout({ children, mode }) {
    return (
        <div className="auth-layout">
            <AuthHeader mode={mode} />
            <main className="auth-content">
                {children}
            </main>
        </div>
    );
}

export default AuthLayout;