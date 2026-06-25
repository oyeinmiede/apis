import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import CanvasObjectLayer from "./canvas/CanvasObjectLayer";
import { debounce } from "../utils/debounce";
import { loadBoardSnapshot, saveBoardSnapshot } from "../utils/boardStorage";
import { supabase } from "@/services/supabase/client";

function Canvas({ setEditor, items, setItems, activeTool, boardId }) {

    function handleCanvasClick(e) {
        if (activeTool !== "sticky") return;

        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newItem = {
            id: crypto.randomUUID(),
            type: "sticky",
            x,
            y,
            content: "New idea",
        };

        setItems([
            ...items,
            newItem
        ]);
    }

    return (
        <div
            className="canvas-wrapper"
            onDoubleClick={handleCanvasClick}
        >
            <CanvasObjectLayer items={items} />

            <Tldraw
                hideUi
                onMount={(editor) => {
                    setEditor(editor);

                    async function loadCanvas() {
                        const snapshot = await loadBoardSnapshot(
                            supabase,
                            boardId
                        );
                        if (snapshot) {
                            editor.loadSnapshot(snapshot);
                        }
                    }
                    loadCanvas();

                    const saveSnapshot = debounce(() => {
                        const snapshot = editor.getSnapshot();
                        saveBoardSnapshot(
                            supabase,
                            boardId,
                            snapshot
                        );
                    }, 1000);

                    const cleanup = editor.store.listen(
                        saveSnapshot,
                        {
                            scope: "document",
                        }
                    );
                    return cleanup;
                }}
            />

        </div>
    );
}

export default Canvas;