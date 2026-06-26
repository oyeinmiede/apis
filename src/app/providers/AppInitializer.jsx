import { useEffect } from "react";

import { supabase } from "@/services/supabase/client";

import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";
import useBoardStore from "@/features/boards/store/boardStore";
import useAppStore from "@/app/store/appStore";

import { getUserWorkspaces } from "@/features/workspace/services/workspaces";
import { getBoards } from "@/features/boards/services/boards";

function AppInitializer({ children }) {
    const setSession = useAuthStore(
        (s) => s.setSession
    );

    const setWorkspaces = useWorkspaceStore(
        (s) => s.setWorkspaces
    );

    const setCurrentWorkspace = useWorkspaceStore(
        (s) => s.setCurrentWorkspace
    );

    const setBoards = useBoardStore(
        (s) => s.setBoards
    );

    const initialized = useAppStore(
        (s) => s.initialized
    );

    const setInitialized = useAppStore(
        (s) => s.setInitialized
    );

    useEffect(() => {
        async function initialize() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);

            if (session?.user) {
                const workspaceResult =
                    await getUserWorkspaces(
                        session.user.id
                    );

                const workspaces =
                    workspaceResult.data?.map(
                        (item) => item.workspaces
                    ) ?? [];

                setWorkspaces(workspaces);

                const savedWorkspaceId =
                    localStorage.getItem("currentWorkspace");

                const currentWorkspace =
                    workspaces.find(
                        workspace => workspace.id === savedWorkspaceId
                    ) ??
                    workspaces[0] ??
                    null;

                setCurrentWorkspace(currentWorkspace);

                if (currentWorkspace) {
                    const boards =
                        await getBoards(currentWorkspace.id);
                    setBoards(boards.data ?? []);
                }
            }

            setInitialized(true);

            supabase.auth.onAuthStateChange(
                (_, session) => {
                    setSession(session);
                }
            );
        }

        initialize();
    }, []);

    if (!initialized) {
        return (
            <div className="auth-loading">
                Loading...
            </div>
        );
    }

    return children;
}

export default AppInitializer;