// import { useState } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
// import { setupApisStyles } from "../utils/tldrawStyles";
import CanvasObjectLayer from "./canvas/CanvasObjectLayer";

function Canvas({
    setEditor,
    items,
    setItems,
    activeTool,
}) {
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
            content: "New idea"
        };
        setItems([
            ...items,
            newItem
        ]);
    }

    return (
        <div className="canvas-wrapper" onDoubleClick={handleCanvasClick}>
            <CanvasObjectLayer items={items} />
            <Tldraw
                hideUi
                onMount={(editor) => {
                    setEditor(editor);
                }}
            />

        </div>
    );
}

export default Canvas;