import { useEffect } from "react";

import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

import { getUserWorkspaces } from "../services/workspaces";

function WorkspaceProvider({ children }) {
    const user = useAuthStore((state) => state.user);

    const setCurrentWorkspace = useWorkspaceStore(
        (state) => state.setCurrentWorkspace
    );

    const setLoading = useWorkspaceStore(
        (state) => state.setLoading
    );

    useEffect(() => {
        async function loadWorkspace() {
            if (!user) {
                setCurrentWorkspace(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            const { data, error } = await getUserWorkspaces(user.id);

            if (error) {
                console.error(error);
            }

            if (data?.length > 0) {
                setCurrentWorkspace(data[0].workspaces);
            } else {
                setCurrentWorkspace(null);
            }

            setLoading(false);
        }

        loadWorkspace();
    }, [user]);

    return children;
}

export default WorkspaceProvider;