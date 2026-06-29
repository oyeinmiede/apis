import useBoardStore from "../store/boardStore";

function BoardsStats() {
    const boards = useBoardStore(state => state.boards);
    const totalBoards = boards.length;

    return (
        <div className="boards-stats">
            <div className="stat-card">
                <span className="stat-value">
                    {totalBoards}
                </span>
                <span className="stat-label">
                    Total Boards
                </span>
            </div>
        </div>
    );
}

export default BoardsStats;