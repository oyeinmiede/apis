import { useState } from "react";
import BoardCard from "./BoardCard";
import CreateBoardCard from "./CreateBoardCard";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import useBoardStore from "@/features/boards/store/boardStore";
import CreateBoardModal from "@/features/boards/components/CreateBoardModal";

import "../styles/recent-boards-section.css";

function RecentBoardsSection() {
    const boards = useBoardStore((state) => state.boards);
    const [open, setOpen] = useState(false);

    return (
        <section>
            <SectionHeader
                title="Recent Boards"
                action={
                    <Button variant="ghost" size="xs">
                        View All
                    </Button>
                }
            />

            <div className="boards-grid">
                {boards.length > 0 ? (
                    <>
                    <button onClick={() => setOpen(true)} >
                        <CreateBoardCard/>
                    </button>
                        

                        {boards.map((board) => (
                            <BoardCard
                                key={board.id}
                                title={board.title}
                                updatedAt={board.updatedAt}
                                board={board}
                            />
                        ))}
                    </>
                ) : (
                    <div className="empty-state">
                        <h3>No boards yet.</h3>
                        <p>Create your first board to start building.</p>
                        <Button variant="secondary" onClick={() => setOpen(true)}>
                            Create your first Board
                        </Button>
                    </div>
                )}
            </div>

            <CreateBoardModal open={open} onClose={() => setOpen(false)} />
        </section>
    );
}

export default RecentBoardsSection;
