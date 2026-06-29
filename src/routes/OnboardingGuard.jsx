import { Navigate } from "react-router-dom";
import useWorkspaceStore from "@/app/store/workspaceStore";

function OnboardingGuard({ children }) {
    const workspace = useWorkspaceStore((state) => state.currentWorkspace);
    if (workspace) return <Navigate to="/dashboard" replace />;
    return children;
}

export default OnboardingGuard;