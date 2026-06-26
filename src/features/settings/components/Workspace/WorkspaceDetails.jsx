import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    updateWorkspace,
} from "@/features/workspace/services/workspaces";

import "./styles/workspace-settings.css";

const COLORS = [
    "#F9A825",
    "#43A047",
    "#1E88E5",
    "#8E24AA",
    "#E53935",
    "#546E7A",
    "#FB8C00",
    "#00897B",
];

const EMOJIS = [
    "🐝",
    "🚀",
    "🦊",
    "🧠",
    "🔥",
    "💼",
    "📚",
    "🎨",
];

function WorkspaceDetails({
    workspace,
    editable,
    onUpdated,
}) {
    const [name, setName] =
        useState("");

    const [emoji, setEmoji] =
        useState("🐝");

    const [color, setColor] =
        useState("#F9A825");

    useEffect(() => {
        if (!workspace) return;

        setName(workspace.name);

        setEmoji(
            workspace.emoji
        );

        setColor(
            workspace.cover_color
        );
    }, [workspace]);

    async function save() {
        const { data } =
            await updateWorkspace(
                workspace.id,
                {
                    name,
                    emoji,
                    cover_color:
                        color,
                }
            );

        if (data) {
            onUpdated(data);
        }
    }

    if (!workspace) return null;

    return (
        <section className="workspace-card">

            <div className="workspace-header">

                <div
                    className="workspace-preview"
                    style={{
                        background:
                            color,
                    }}
                >
                    {emoji}
                </div>

                <div>

                    <h2>
                        Workspace
                    </h2>

                    <p>
                        Customize
                        appearance
                    </p>

                </div>

            </div>

            <label>

                Name

                <Input
                    value={name}
                    disabled={
                        !editable
                    }
                    onChange={(
                        e
                    ) =>
                        setName(
                            e.target
                                .value
                        )
                    }
                />

            </label>

            <div className="emoji-grid">

                {EMOJIS.map((e) => (

                    <button
                        key={e}
                        disabled={
                            !editable
                        }
                        className={`emoji-option ${
                            emoji === e
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setEmoji(e)
                        }
                    >
                        {e}
                    </button>

                ))}

            </div>

            <div className="color-grid">

                {COLORS.map((c) => (

                    <button
                        key={c}
                        disabled={
                            !editable
                        }
                        className={`color-option ${
                            color === c
                                ? "active"
                                : ""
                        }`}
                        style={{
                            background:
                                c,
                        }}
                        onClick={() =>
                            setColor(c)
                        }
                    />

                ))}

            </div>

            {editable && (

                <Button
                    onClick={save}
                >
                    Save
                </Button>

            )}

        </section>
    );
}

export default WorkspaceDetails;