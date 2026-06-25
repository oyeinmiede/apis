import {
    Plus,
    Minus,
    ScanSearch
} from "lucide-react";
import { useEffect, useState } from "react";

function ZoomDock({ editor }) {
    const [zoom, setZoom] = useState(100)

    useEffect(() => {
        if (!editor) return;
        const interval =
            setInterval(() => {
                const level = editor.getZoomLevel?.();
                if (level) setZoom(Math.round(level * 100));
            }, 100);
        return () => clearInterval(interval);
    }, [editor]);

    return (
        <div className="zoom-dock">
            <button
                onClick={() =>
                    editor?.zoomToFit()
                }
            >
                <ScanSearch size={16} />
            </button>
            <button onClick={() => editor?.zoomIn()}><Plus size={18} /></button>
            <span>{zoom}%</span>
            <button onClick={() => editor?.zoomOut()}><Minus size={18} /></button>
        </div>
    );
}

export default ZoomDock;