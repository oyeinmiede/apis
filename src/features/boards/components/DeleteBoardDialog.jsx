import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";

import {deleteBoard} from "../services/boards";

import useBoardStore from "../store/boardStore";

function DeleteBoardDialog({
    board,
    open,
    onOpenChange,
}){

    const boards=useBoardStore(s=>s.boards);
    const setBoards=useBoardStore(s=>s.setBoards);

    async function destroy() {
        const { error } = await deleteBoard({ boardId: board.id, title: board.title });
    
        if (error) {
            console.error("Delete failed:", error);
            return;
        }
    
        setBoards(boards.filter(b => b.id !== board.id));
        onOpenChange(false);
    }

    return(

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete board?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <Button
                    variant="destructive"
                    onClick={destroy}
                >
                    Delete Board
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteBoardDialog;