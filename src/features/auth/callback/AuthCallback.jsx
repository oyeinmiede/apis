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
            Signing you in...
        </div>
    );
}

export default AuthCallback;