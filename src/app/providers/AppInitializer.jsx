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

    const setWorkspace = useWorkspaceStore(
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

                const workspace =
                    workspaceResult.data?.[0]?.workspaces ??
                    null;

                setWorkspace(workspace);

                if (workspace) {
                    const boards =
                        await getBoards(
                            workspace.id
                        );

                    setBoards(
                        boards.data ?? []
                    );
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