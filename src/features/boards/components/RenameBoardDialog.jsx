import {useState} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {updateBoard} from "../services/boards";
import useBoardStore from "../store/boardStore";

function RenameBoardDialog({ board, open, onOpenChange }) {
    const [name, setName] = useState(board?.title ?? "");
    const boards = useBoardStore(s => s.boards);
    const setBoards = useBoardStore(s => s.setBoards);

    async function save() {
        const { data } = await updateBoard({
            boardId: board.id,
            title: name,
        });
        if (data) {
            setBoards(boards.map(b => b.id === board.id ? data : b));
        }
        onOpenChange(false);
    }

    if (!board) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename Board</DialogTitle>
                </DialogHeader>

                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && save()}
                />

                <Button onClick={save}>Save</Button>
            </DialogContent>
        </Dialog>
    );
}

export default RenameBoardDialog;