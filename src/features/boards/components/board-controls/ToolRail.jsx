import React, { useState, useEffect, useRef } from "react";
import {
    MousePointer2, Hand, Pencil, Shapes, ArrowUpRight,
    StickyNote, Type, Image, Sparkles, Eraser,
} from "lucide-react";
import {
    GeoShapeGeoStyle,
    DefaultSizeStyle,
    DefaultColorStyle,
} from "tldraw";
import "../../styles/canvas.css";

const tools = [
    { icon: MousePointer2, label: "Select", action: "select" },
    { icon: Hand, label: "Hand", action: "hand" },
    { icon: Pencil, label: "Draw", action: "draw" },
    { icon: Eraser, label: "Eraser", action: "eraser" },
    { icon: Shapes, label: "Shape", action: "geo" },
    { icon: ArrowUpRight, label: "Arrow", action: "arrow" },
    { divider: true },
    { icon: StickyNote, label: "Sticky Note", action: "note" },
    { icon: Type, label: "Text", action: "text" },
    { icon: Image, label: "Image", action: "asset" },
    { divider: true },
    { icon: Sparkles, label: "Create with Hexa", action: "hexa" },
];

const shapes = [
    { label: "Rectangle", icon: "▭", geo: "rectangle" },
    { label: "Ellipse", icon: "◯", geo: "ellipse" },
    { label: "Triangle", icon: "△", geo: "triangle" },
    { label: "Diamond", icon: "◇", geo: "diamond" },
    { label: "Pentagon", icon: "⬟", geo: "pentagon" },
    { label: "Hexagon", icon: "⬢", geo: "hexagon" },
    { label: "Octagon", icon: "⯃", geo: "octagon" },
    { label: "Star", icon: "★", geo: "star" },
    { label: "Cloud", icon: "☁", geo: "cloud" },
    { label: "Trapezoid", icon: "▱", geo: "trapezoid" },
];

const penOptions = [
    { label: "Thin", size: "s" },
    { label: "Medium", size: "m" },
    { label: "Bold", size: "l" },
    { label: "Very Bold", size: "xl" },
];

// Exact tldraw DefaultColorStyle values with display colors
const colorOptions = [
    { label: "Black", value: "black", display: "#1d1d1d" },
    { label: "Grey", value: "grey", display: "#9ca3af" },
    { label: "White", value: "white", display: "#f1f0ef" },
    { label: "Red", value: "red", display: "#e03131" },
    { label: "Orange", value: "orange", display: "#f76707" },
    { label: "Yellow", value: "yellow", display: "#f59f00" },
    { label: "Green", value: "green", display: "#2f9e44" },
    { label: "Blue", value: "blue", display: "#1971c2" },
    { label: "Violet", value: "violet", display: "#7048e8" },
    { label: "Light Red", value: "light-red", display: "#ffc9c9" },
    { label: "Light Orange", value: "light-orange", display: "#ffd8a8" },
    { label: "Light Yellow", value: "light-yellow", display: "#ffec99" },
    { label: "Light Green", value: "light-green", display: "#b2f2bb" },
    { label: "Light Blue", value: "light-blue", display: "#a5d8ff" },
    { label: "Light Violet", value: "light-violet", display: "#d0bfff" },
];

function ColorPicker({ onSelect }) {
    return (
        <div className="pen-colors">
            {colorOptions.map(color => (
                <button
                    key={color.value}
                    className="color-option"
                    title={color.label}
                    style={{ backgroundColor: color.display }}
                    onClick={e => {
                        e.stopPropagation();
                        onSelect(color.value);
                    }}
                />
            ))}
        </div>
    );
}

function ToolRail({ editor, activeTool, setActiveTool }) {
    const [showShapes, setShowShapes] = useState(false);
    const [showPenSettings, setShowPenSettings] = useState(false);
    const [showArrowColors, setShowArrowColors] = useState(false);
    const [showNoteColors, setShowNoteColors] = useState(false);
    const railRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (railRef.current && !railRef.current.contains(e.target)) {
                setShowShapes(false);
                setShowPenSettings(false);
                setShowArrowColors(false);
                setShowNoteColors(false);
            }
        }
        document.addEventListener("pointerdown", handleOutsideClick);
        return () => document.removeEventListener("pointerdown", handleOutsideClick);
    }, []);

    function closeAllMenus() {
        setShowShapes(false);
        setShowPenSettings(false);
        setShowArrowColors(false);
        setShowNoteColors(false);
    }

    function setGeo(geo) {
        if (!editor) return;
        editor.setStyleForNextShapes(GeoShapeGeoStyle, geo);
    }

    function setSize(size) {
        if (!editor) return;
        editor.setStyleForNextShapes(DefaultSizeStyle, size);
    }

    function setColor(color) {
        if (!editor) return;
        editor.setStyleForNextShapes(DefaultColorStyle, color);
    }

    function selectTool(tool) {
        if (!editor) return;
        if (tool === "hexa") {
            setActiveTool("hexa");
            return;
        }
        editor.setCurrentTool(tool);
        setActiveTool(tool);
        closeAllMenus();
    }

    return (
        <div className="tool-rail" ref={railRef}>
            {tools.map((tool, index) => {
                const Icon = tool.icon;

                if (tool.divider) {
                    return <div key={`divider-${index}`} className="tool-divider" />;
                }

                return (
                    <React.Fragment key={tool.label}>
                        <button
                            className={`
                                tool-button
                                ${tool.action === "hexa" ? "hexa-tool" : ""}
                                ${activeTool === tool.action ? "active" : ""}
                            `}
                            onClick={() => {
                                if (tool.action === "geo") {
                                    setShowShapes(prev => !prev);
                                    setShowPenSettings(false);
                                    setShowArrowColors(false);
                                    setShowNoteColors(false);
                                    return;
                                }
                                if (tool.action === "draw") {
                                    setShowPenSettings(prev => !prev);
                                    setShowShapes(false);
                                    setShowArrowColors(false);
                                    setShowNoteColors(false);
                                    editor?.setCurrentTool("draw");
                                    setActiveTool("draw");
                                    return;
                                }
                                if (tool.action === "arrow") {
                                    setShowArrowColors(prev => !prev);
                                    setShowShapes(false);
                                    setShowPenSettings(false);
                                    setShowNoteColors(false);
                                    editor?.setCurrentTool("arrow");
                                    setActiveTool("arrow");
                                    return;
                                }
                                if (tool.action === "note") {
                                    setShowNoteColors(prev => !prev);
                                    setShowShapes(false);
                                    setShowPenSettings(false);
                                    setShowArrowColors(false);
                                    editor?.setCurrentTool("note");
                                    setActiveTool("note");
                                    return;
                                }
                                selectTool(tool.action);
                            }}
                        >
                            <Icon size={18} />
                            <span className="tool-tooltip">{tool.label}</span>
                        </button>

                        {/* Shape picker + color */}
                        {tool.action === "geo" && showShapes && (
                            <div className="shape-menu">
                                {shapes.map(shape => (
                                    <button
                                        key={shape.label}
                                        className="shape-option"
                                        onClick={() => {
                                            setGeo(shape.geo);
                                            editor?.setCurrentTool("geo");
                                            setActiveTool("geo");
                                            setShowShapes(false);
                                        }}
                                    >
                                        <span>{shape.icon}</span>
                                        <span>{shape.label}</span>
                                    </button>
                                ))}
                                <ColorPicker onSelect={color => {
                                    setColor(color);
                                }} />
                            </div>
                        )}

                        {/* Pen settings + color */}
                        {tool.action === "draw" && showPenSettings && (
                            <div className="pen-menu">
                                {penOptions.map(option => (
                                    <button
                                        key={option.label}
                                        className="pen-option"
                                        onClick={() => {
                                            setSize(option.size);
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                                <ColorPicker onSelect={color => {
                                    setColor(color);
                                }} />
                            </div>
                        )}

                        {/* Arrow color picker */}
                        {tool.action === "arrow" && showArrowColors && (
                            <div className="pen-menu">
                                <ColorPicker onSelect={color => {
                                    setColor(color);
                                }} />
                            </div>
                        )}

                        {/* Note color picker */}
                        {tool.action === "note" && showNoteColors && (
                            <div className="pen-menu">
                                <ColorPicker onSelect={color => {
                                    setColor(color);
                                }} />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default ToolRail;