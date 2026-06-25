import { Navigate } from "react-router-dom";
import useWorkspaceStore from "@/app/store/workspaceStore";

function OnboardingGuard({
    children,
}) {
    const workspace =
        useWorkspaceStore(
            (state) => state.currentWorkspace
        );

    const loading =
        useWorkspaceStore(
            (state) => state.loading
        );

    if (loading) {
        return (
            <div className="auth-loading">
                Loading...
            </div>
        );
    }

    if (workspace) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
}

export default OnboardingGuard;