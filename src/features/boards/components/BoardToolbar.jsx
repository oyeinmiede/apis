import { useNavigate } from "react-router-dom";

function BoardToolbar({
    board,
}) {
    const navigate = useNavigate()

    return (
        <header className="board-toolbar">
            <div className="board-brand" onClick={() => navigate("/dashboard")}>
                <img src="/logo-apis.png" alt="" />
                <span>Apis</span>
            </div>
            <div className="board-title">
                {board.title}
            </div>
            <div className="board-actions">
                <button>Share</button>
                <button>⋮</button>
            </div>

        </header>
    );
}

export default BoardToolbar;