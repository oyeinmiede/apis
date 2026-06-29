import { Navigate } from "react-router-dom";
import useAuthStore from "@/app/store/authStore";

function PublicOnlyRoute({ children }) {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);

    if (loading) {
        return (
            <div className="auth-loading">
                <div className="auth-loading__logo">
                    <img src="/logo-apis.png" alt="logo" />
                    <span>Apis</span>
                </div>
                <div className="auth-loading__track">
                    <div className="auth-loading__fill" />
                </div>
                <span className="auth-loading__label">Loading your workspace…</span>
            </div>
        )
    }

    if (user) return <Navigate to="/dashboard" replace />;
    return children;
}

export default PublicOnlyRoute;