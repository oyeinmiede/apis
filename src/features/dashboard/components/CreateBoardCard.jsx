import { Hexagon } from "lucide-react";
import "../styles/create-board-card.css";

function CreateBoardCard() {
    return (
        <button className="create-board-card">
            <Hexagon size={28} />
            <h3>Start a new Hive</h3>
            <span>
                Create Board from scratch
            </span>
        </button>
    );
}

export default CreateBoardCard;