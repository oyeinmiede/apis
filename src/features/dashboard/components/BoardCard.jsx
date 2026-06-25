import "../styles/board-card.css";
import { useNavigate } from "react-router-dom";

function BoardCard({
    title,
    updatedAt,
    board
}) {
    const navigate = useNavigate();

    return (
        <article onClick={()=> navigate(`/board/${board.id}`)} className="board-card">
            <div className="board-preview" />
            <h3>{title}</h3>
            <span>
                Edited {updatedAt}
            </span>
        </article>
    );
}

export default BoardCard;