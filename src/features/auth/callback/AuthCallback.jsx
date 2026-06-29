import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard", {
            replace: true,
        });
    }, []);

    return (
        <div className="auth-loading">
            <div className="auth-loading__logo">
                <img src="/logo-apis.png" alt="logo" />
                <span>Apis</span>
            </div>
            <div className="auth-loading__track">
                <div className="auth-loading__fill" />
            </div>
            <span className="auth-loading__label">Signing you in…</span>
        </div>
    );
}

export default AuthCallback;