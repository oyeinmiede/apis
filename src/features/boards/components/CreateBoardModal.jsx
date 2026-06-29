import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBoard } from "../services/boards";

import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";
import useBoardStore from "../store/boardStore";

import "../styles/create-board-modal.css";

function CreateBoardModal({ open, onClose, }) {
    const [loading, setLoading] = useState(false);
    const [boardName, setBoardName] = useState("");
    const user = useAuthStore(state => state.user)
    const workspace = useWorkspaceStore(state => state.currentWorkspace)
    const addBoard = useBoardStore(state => state.addBoard)

    function handleClose() {
        setBoardName("");
        onClose();
    }

    async function handleCreateBoard() {
        if (!boardName.trim()) return;
        setLoading(true);
        const { data, error } =
            await createBoard({
                workspaceId: workspace.id,
                userId: user.id,
                title: boardName,
            });
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        addBoard(data);
        setLoading(false);
        handleClose();
    }

    if (!open) return null;

    return (
        <div className="create-board-overlay">
            <div className="create-board-modal">
                <h2>Create Board</h2>
                <Input
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    placeholder="Board name"
                />
                <Button disabled={loading} onClick={handleCreateBoard}>
                    {loading ? "Creating..." : "Create Board"}
                </Button>
            </div>
        </div>
    );
}

export default CreateBoardModal;