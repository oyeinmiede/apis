import { Navigate } from "react-router-dom";
import useWorkspaceStore from "@/app/store/workspaceStore";

function WorkspaceRequiredRoute({
    children,
}) {
    const workspace = useWorkspaceStore((state) => state.currentWorkspace);

    if (!workspace) {
        return (
            <Navigate to="/onboarding" replace />
        );
    }
    return children;
}

export default WorkspaceRequiredRoute;