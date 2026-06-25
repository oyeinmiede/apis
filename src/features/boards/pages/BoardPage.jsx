import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BoardToolbar from "../components/BoardToolbar";
import Canvas from "../components/Canvas";
import ToolRail from "../components/board-controls/ToolRail";
import UndoRedoDock from "../components/board-controls/UndoRedoDock";
import ZoomDock from "../components/board-controls/ZoomDock";

import {
    getBoard,
} from "../services/boards";

import '../styles/board.css'

function BoardPage() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [editor, setEditor] = useState(null);
    const [activeTool, setActiveTool] = useState("select");
    const [canvasItems, setCanvasItems] = useState([]);

    useEffect(() => {
        async function loadBoard() {
            const { data, error } =
                await getBoard(id);
            if (error) {
                console.error(error);
                return;
            }
            setBoard(data);
        }
        loadBoard();
    }, [id]);

    useEffect(() => {
        if (!editor) return;
        function handleKey(e) {
            if (!e.altKey) return;
            if (e.key === "v") editor.setCurrentTool("select");
            if (e.key === "h") editor.setCurrentTool("hand");
            if (e.key === "p") editor.setCurrentTool("draw");
            if (e.key === "a") editor.setCurrentTool("arrow");
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [editor]);

    if (!board) return null;

    return (
        <div className="board-page">
            <BoardToolbar board={board} />
            <Canvas activeTool={activeTool} items={canvasItems} setItems={setCanvasItems} setEditor={setEditor} boardId={board.id} />
            <ToolRail editor={editor} activeTool={activeTool} setActiveTool={setActiveTool} />
            <UndoRedoDock editor={editor} />
            <ZoomDock editor={editor} />
        </div>
    );
}

export default BoardPage;