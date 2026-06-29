import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteWorkspace, } from "@/features/workspace/services/workspaces";
import useWorkspaceStore from "@/app/store/workspaceStore";
import "./styles/workspace-settings.css";

function DeleteWorkspaceCard({ workspace, currentUser,}) {
    const { workspaces, setWorkspaces, setCurrentWorkspace, } = useWorkspaceStore();
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    if (!workspace) return null;
    const isOwner = workspace.owner_id === currentUser.id;
    if (!isOwner) return null;
    async function handleDelete() {
        if (confirm !== workspace.name) return
        setLoading(true);
        const { error } =
            await deleteWorkspace(
                workspace.id
            );

        if (!error) {
            const remaining = workspaces.filter(w => w.id !== workspace.id);
            setWorkspaces(remaining);
            if (remaining.length >0) {
                setCurrentWorkspace(remaining[0]);
            }
        }
        setLoading(false);
    }

    return (
        <section className="workspace-card danger-card">
            <div className="workspace-card-header">
                <h2>Danger Zone</h2>
                <span>This action cannot be undone.</span>
            </div>
            <p className="danger-text">
                Type
                <strong>
                    {" "}
                    {workspace.name}
                    {" "}
                </strong>
                to confirm.
            </p>
            <input
                className="danger-input"
                value={confirm}
                onChange={e =>
                    setConfirm(
                        e.target.value
                    )
                }
            />
            <Button
                variant="destructive"
                disabled={
                    loading ||
                    confirm !==
                        workspace.name
                }
                onClick={
                    handleDelete
                }
            >
                {loading
                    ? "Deleting..."
                    : "Delete Workspace"}
            </Button>
        </section>
    );
}

export default DeleteWorkspaceCard;