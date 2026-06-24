import { useEffect } from "react";
import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

import {
    getUserWorkspaces,
} from "../services/workspaces";

function WorkspaceProvider({
    children,
}) {
    const user =
        useAuthStore(
            (state) => state.user
        );

    const setCurrentWorkspace =
        useWorkspaceStore(
            (state) =>
                state.setCurrentWorkspace
        );

    useEffect(() => {
        if (!user) return;

        async function loadWorkspace() {
            const { data } =
                await getUserWorkspaces(
                    user.id
                );

            if (
                data &&
                data.length > 0
            ) {
                setCurrentWorkspace(
                    data[0].workspaces
                );
            }
        }

        loadWorkspace();
    }, [user]);

    return children;
}

export default WorkspaceProvider;