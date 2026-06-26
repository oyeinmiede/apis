import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

import {
    createWorkspace,
} from "../services/workspaces";

import "../styles/create-workspace-modal.css";

const emojis = [
    "🐝",
    "🚀",
    "🎨",
    "💼",
    "💡",
    "🌱",
    "📚",
    "🎮",
];

const colors = [
    "#F9A825",
    "#4F46E5",
    "#059669",
    "#DC2626",
    "#7C3AED",
    "#EA580C",
    "#0EA5E9",
    "#171717"
];

function CreateWorkspaceModal({
    open,
    onClose,
}) {
    const user = useAuthStore(state => state.user);

    const addWorkspace = useWorkspaceStore(
        state => state.addWorkspace
    );

    const setCurrentWorkspace = useWorkspaceStore(
        state => state.setCurrentWorkspace
    );

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");

    const [emoji, setEmoji] = useState("🐝");

    const [color, setColor] = useState("#F9A825");
    const modalRef = useRef(null);

    useEffect(() => {
        if (!open) return;
    
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                onClose();
            }
    
            if (e.key === "Enter") {
                handleCreate();
            }
        }
    
        function handleClickOutside(e) {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target)
            ) {
                onClose();
            }
        }
    
        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, name, emoji, color]);

    async function handleCreate() {
        if (!name.trim()) return;

        setLoading(true);

        const { data, error } =
            await createWorkspace({
                name,
                emoji,
                coverColor: color,
                ownerId: user.id,
            });

        setLoading(false);

        if (error) {
            console.error(error);
            return;
        }

        addWorkspace(data);

        setCurrentWorkspace(data);

        localStorage.setItem(
            "currentWorkspace",
            data.id
        );

        setName("");
        setEmoji("🐝");
        setColor("#F9A825");

        onClose();
    }

    if (!open) return null;

    return (
        <div className="workspace-modal-overlay">

            <div className="workspace-modal" ref={modalRef}>

                <h2>Create Workspace</h2>

                <Input
                    placeholder="Workspace name"
                    value={name}
                    onChange={e =>
                        setName(e.target.value)
                    }
                />

                <h4>Icon</h4>

                <div className="emoji-grid">

                    {emojis.map(icon => (

                        <button
                            key={icon}
                            className={
                                emoji === icon
                                    ? "emoji-btn active"
                                    : "emoji-btn"
                            }
                            onClick={() => setEmoji(icon)}
                        >
                            {icon}
                        </button>

                    ))}

                </div>

                <h4>Accent</h4>

                <div className="color-grid">

                    {colors.map(c => (

                        <button
                            key={c}
                            className={
                                color === c
                                    ? "color-btn active"
                                    : "color-btn"
                            }
                            style={{
                                background: c,
                            }}
                            onClick={() => setColor(c)}
                        />

                    ))}

                </div>

                <Button
                    className="workspace-create-button"
                    disabled={loading}
                    onClick={handleCreate}
                >
                    {loading
                        ? "Creating..."
                        : "Create Workspace"}
                </Button>

            </div>

        </div>
    );
}

export default CreateWorkspaceModal;