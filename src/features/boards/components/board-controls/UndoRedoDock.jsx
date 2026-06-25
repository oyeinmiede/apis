import {
    Undo2,
    Redo2,
} from "lucide-react";

function UndoRedoDock({ editor }) {
    return (
        <div className="undo-redo-dock">
            <button onClick={() => editor?.undo()}><Undo2 size={18} /></button>
            <button onClick={() => editor?.redo()}><Redo2 size={18} /></button>
        </div>
    );
}

export default UndoRedoDock;