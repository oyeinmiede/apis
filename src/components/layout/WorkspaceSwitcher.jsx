import { useState } from "react";
import { ChevronDown, Check, Plus, Settings } from "lucide-react";
import useWorkspaceStore from "@/app/store/workspaceStore";
import CreateWorkspaceModal from "@/features/workspace/components/createWorkSpaceModal";
import "./styles/workspace-switcher.css";

function WorkspaceSwitcher() {
    const [open, setOpen] = useState(false);
    const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace);
    const workspaces = useWorkspaceStore(state => state.workspaces);
    const setCurrentWorkspace = useWorkspaceStore(state => state.setCurrentWorkspace);
    const [showCreate, setShowCreate] = useState(false);

    return (
        <div className="workspace-switcher-wrapper">
            <button
                className="workspace-switcher"
                onClick={() => setOpen(!open)}
            >
                <div
                    className="workspace-icon"
                    style={{
                        backgroundColor:
                            currentWorkspace?.cover_color ??
                            "#F9A825",
                    }}
                >
                    {currentWorkspace?.emoji ?? "🐝"}
                </div>

                <div className="workspace-info">
                    <span className="workspace-name">
                        {currentWorkspace?.name}
                    </span>
                    <span className="workspace-label">
                        Workspace
                    </span>
                </div>
                <ChevronDown
                    size={18}
                    className={
                        open
                            ? "rotate"
                            : ""
                    }
                />
            </button>

            {open && (
                <div className="workspace-dropdown">
                    <p className="workspace-title">
                        Workspaces
                    </p>
                    <div className="workspace-section">
                        {workspaces.map(ws => (
                            <button
                                key={ws.id}
                                className={`workspace-option ${currentWorkspace?.id === ws.id
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() => {
                                    setCurrentWorkspace(ws);
                                    localStorage.setItem(
                                        "currentWorkspace",
                                        ws.id
                                    );
                                    setOpen(false);
                                }}
                            >
                                <span
                                    className="workspace-option-icon"
                                    style={{
                                        backgroundColor:
                                            ws.cover_color ??
                                            "#F9A825",
                                    }}
                                >
                                    {ws.emoji}
                                </span>

                                <span className="workspace-option-name">
                                    {ws.name}
                                </span>

                                {currentWorkspace?.id === ws.id && (
                                    <Check size={16} />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="workspace-divider" />

                    <button
                        className="workspace-create"
                        onClick={() => {
                            setShowCreate(true);
                            setOpen(false);
                        }}
                    >
                        <Plus size={16} />
                        Create workspace
                    </button>

                    <button className="workspace-settings">
                        <Settings size={16} />
                        Workspace settings
                    </button>

                </div>
            )}
            <CreateWorkspaceModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
            />
        </div>
    );
}

export default WorkspaceSwitcher;