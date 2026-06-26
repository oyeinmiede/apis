import { useEffect } from "react";

import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

import { getUserWorkspaces } from "@/features/workspace/services/workspaces";

function WorkspaceProvider({ children }) {
    const user = useAuthStore((state) => state.user);

    const setWorkspaces = useWorkspaceStore(
        (state) => state.setWorkspaces
    );

    const setCurrentWorkspace = useWorkspaceStore(
        (state) => state.setCurrentWorkspace
    );

    const setLoading = useWorkspaceStore(
        (state) => state.setLoading
    );

    useEffect(() => {
        async function loadWorkspaces() {
            if (!user) {
                setWorkspaces([]);
                setCurrentWorkspace(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            const { data, error } = await getUserWorkspaces(user.id);

            if (error) {
                console.error(error);

                setWorkspaces([]);
                setCurrentWorkspace(null);
                setLoading(false);
                return;
            }

            const workspaces =
                data?.map((item) => item.workspaces) ?? [];

            setWorkspaces(workspaces);

            const savedWorkspaceId =
                localStorage.getItem(
                    "current-workspace"
                );

            const current =
                workspaces.find(
                    workspace =>
                        workspace.id === savedWorkspaceId
                ) ??
                workspaces[0] ??
                null;

            setCurrentWorkspace(current);

            setLoading(false);
        }

        loadWorkspaces();
    }, [
        user,
        setWorkspaces,
        setCurrentWorkspace,
        setLoading,
    ]);

    return children;
}

export default WorkspaceProvider;