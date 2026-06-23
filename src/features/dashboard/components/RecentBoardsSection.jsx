import BoardCard from "./BoardCard";
import CreateBoardCard from "./CreateBoardCard";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { recentBoards } from "../data/recentBoards";

import "../styles/recent-boards-section.css";

function RecentBoardsSection() {
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
                <CreateBoardCard />

                {recentBoards.length > 0 ? (
                    recentBoards.map((board) => (
                        <BoardCard
                            key={board.id}
                            title={board.title}
                            updatedAt={board.updatedAt}
                        />
                    ))
                ) : (
                    <p>
                        No boards yet.
                    </p>
                )}
            </div>
        </section>
    );
}

export default RecentBoardsSection;