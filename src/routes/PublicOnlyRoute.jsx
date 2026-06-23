import { Navigate } from "react-router-dom";
import useAuthStore from "@/app/store/authStore";

function PublicOnlyRoute({
    children,
}) {
    const user = useAuthStore(
        (state) => state.user
    );

    if (user) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
}

export default PublicOnlyRoute;