import { useEffect } from "react";

import useWorkspaceStore from "@/app/store/workspaceStore";
import useBoardStore from "../store/boardStore";

import { getBoards } from "../services/boards";

function BoardProvider({ children }) {
    const currentWorkspace =
        useWorkspaceStore(
            state => state.currentWorkspace
        );

    const setBoards =
        useBoardStore(
            state => state.setBoards
        );

        useEffect(() => {
            async function loadBoards() {
                if (!currentWorkspace) {
                    setBoards([]);
                    return;
                }
        
                const { data } = await getBoards(currentWorkspace.id);
        
                setBoards(data ?? []);
            }
        
            loadBoards();
        }, [currentWorkspace?.id]);

    return children;
}

export default BoardProvider;