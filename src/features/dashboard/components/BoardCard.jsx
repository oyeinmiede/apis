import BoardActions from "@/features/boards/components/BoardActions";
import "../styles/board-card.css";
import { useNavigate } from "react-router-dom";

function BoardCard({
    title,
    updatedAt,
    board
}) {
    const navigate = useNavigate();
    function formatDate(date) {

        const d = new Date(date);
        const now = new Date();

        const diff = Math.floor((now - d) / 1000);

        if (diff < 60) return "just now";
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;

        return new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(d);

    }

    return (
        <article className="board-card">
            <div className="board-card-top">
                <div className="board-preview" />
                <h3 onClick={() => navigate(`/board/${board.id}`)}>{title}</h3>
                <span>
                    Edited {formatDate(updatedAt)}
                </span>
                <BoardActions board={board} />
            </div>

        </article>
    );
}

export default BoardCard;