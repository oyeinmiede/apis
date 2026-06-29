import useBoardStore from "../store/boardStore";

import BoardCard from "@/features/dashboard/components/BoardCard";

function BoardsGrid({ query, sort }) {
    const boards = useBoardStore(
        state => state.boards
    );

    const filteredBoards = boards.filter(board =>
        board.title
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    const sortedBoards = [...filteredBoards];

    switch (sort) {
        case "alphabetical":
            sortedBoards.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            break;
    
        case "created":
            sortedBoards.sort(
                (a, b) =>
                    new Date(b.created_at) -
                    new Date(a.created_at)
            );
            break;
    
        default:
            sortedBoards.sort(
                (a, b) =>
                    new Date(b.updated_at) -
                    new Date(a.updated_at)
            );
    }


    if (!boards.length) {
        return (
            <div className="boards-empty">
                <h3>No boards yet</h3>
                <p>
                    Create your first board to start building.
                </p>
            </div>
        );
    }

    return (
        <div className="boards-grid-page">
            {filteredBoards.length === 0 ? (
                <div className="boards-empty">
                    <h3 className="empty-title">No boards match</h3>
                    <span>"{query}"</span>
                    <p className="empty-subtitle">
                        Try another search.
                    </p>
                </div>
            ) : (
                filteredBoards.map(board => (
                    <BoardCard
                        key={board.id}
                        board={board}
                        title={board.title}
                        updatedAt={board.updated_at}
                    />
                ))
            )}
        </div>

    );
}

export default BoardsGrid;