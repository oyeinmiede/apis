import "../styles/board-card.css";

function BoardCard({
    title,
    updatedAt,
}) {
    return (
        <article className="board-card">
            <div className="board-preview" />
            <h3>{title}</h3>
            <span>
                Edited {updatedAt}
            </span>
        </article>
    );
}

export default BoardCard;