import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Share2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import RenameBoardDialog from "./RenameBoardDialog";
import DeleteBoardDialog from "./DeleteBoardDialog";

function BoardActions({ board }) {
    const [renameOpen, setRenameOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    if(!board) return null

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className="board-menu-btn"
                        onClick={e => e.stopPropagation()}
                    >
                        <MoreHorizontal size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    onClick={e => e.stopPropagation()}
                    className="dropdown-menu-content"
                >
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("rename clicked, renameOpen before:", renameOpen);
                            setTimeout(() => {
                                setRenameOpen(true);
                            }, 0);
                        }}
                        className="dropdown-menu-item"
                    >
                        <Pencil size={15} />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="dropdown-menu-item"
                    >
                        <Share2 size={15} />
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-red-500 dropdown-menu-item"
                        onClick={(e) => {
                            setTimeout(() => setDeleteOpen(true), 0)
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <Trash2 size={15} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
            <RenameBoardDialog
                key={board.id}
                board={board}
                open={renameOpen}
                onOpenChange={setRenameOpen}
            />
            <DeleteBoardDialog
                board={board}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}

export default BoardActions;