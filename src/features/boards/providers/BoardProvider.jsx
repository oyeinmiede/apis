import { useEffect } from "react";
import useWorkspaceStore from "@/app/store/workspaceStore";
import useBoardStore from "../store/boardStore";

import {
    getBoards,
} from "../services/boards";

function BoardProvider({
    children,
}) {
    const workspace =
        useWorkspaceStore(
            (state) =>
                state.currentWorkspace
        );

    const setBoards =
        useBoardStore(
            (state) =>
                state.setBoards
        );

    useEffect(() => {
        if (!workspace) return;

        async function loadBoards() {
            const { data } =
                await getBoards(
                    workspace.id
                );

            if (data) {
                setBoards(data);
            }
        }

        loadBoards();
    }, [workspace]);

    return children;
}

export default BoardProvider;