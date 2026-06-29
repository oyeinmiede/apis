import { Hexagon } from "lucide-react";
import "../styles/create-board-card.css";

function CreateBoardCard() {
    return (
        <article className="create-board-card">
            <Hexagon size={28} />
            <h3>Start a new Cell</h3>
            <span>
                Create Board from scratch
            </span>
        </article>
    );
}

export default CreateBoardCard;