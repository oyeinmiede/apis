import useAuthStore from "@/app/store/authStore";

import "./styles/workspace-settings.css";

function WorkspaceList({
    workspaces,
    selected,
    onSelect,
}) {
    const user = useAuthStore(
        (s) => s.user
    );

    const owned = workspaces.filter(
        (w) => w.owner_id === user.id
    );

    const member = workspaces.filter(
        (w) => w.owner_id !== user.id
    );

    function WorkspaceItem({ workspace }) {
        return (
            <button
                className={`workspace-list-item ${
                    selected?.id === workspace.id
                        ? "active"
                        : ""
                }`}
                onClick={() =>
                    onSelect(workspace)
                }
            >
                <div
                    className="workspace-list-icon"
                    style={{
                        background:
                            workspace.cover_color,
                    }}
                >
                    {workspace.emoji}
                </div>

                <div className="workspace-list-info">
                    <span>
                        {workspace.name}
                    </span>

                    <small>
                        {workspace.owner_id ===
                        user.id
                            ? "Owner"
                            : "Member"}
                    </small>
                </div>
            </button>
        );
    }

    return (
        <aside className="workspace-list">

            <div className="workspace-group">

                <h3>
                    Owned
                </h3>

                {owned.length === 0 ? (
                    <p className="workspace-empty">
                        No workspaces
                    </p>
                ) : (
                    owned.map((workspace) => (
                        <WorkspaceItem
                            key={workspace.id}
                            workspace={
                                workspace
                            }
                        />
                    ))
                )}

            </div>

            <div className="workspace-divider" />

            <div className="workspace-group">

                <h3>
                    Member
                </h3>

                {member.length === 0 ? (
                    <p className="workspace-empty">
                        None
                    </p>
                ) : (
                    member.map((workspace) => (
                        <WorkspaceItem
                            key={workspace.id}
                            workspace={
                                workspace
                            }
                        />
                    ))
                )}

            </div>

        </aside>
    );
}

export default WorkspaceList;