// import { useState } from "react";
import {
    Trash2,
    Crown,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { updateMemberRole, removeMember } from "@/features/workspace/services/workspaces";

import "./styles/workspace-settings.css";

function MemberList({
    workspace,
    members,
    currentUser,
    onRefresh,
}) {
    if (!workspace) return null;

    const isOwner =
        workspace.owner_id === currentUser.id;

    async function changeRole(
        userId,
        role
    ) {
        await updateMemberRole(
            workspace.id,
            userId,
            role
        );

        onRefresh();
    }

    async function remove(userId) {
        if (
            !confirm(
                "Remove this member?"
            )
        )
            return;

        await removeMember(
            workspace.id,
            userId
        );

        onRefresh();
    }

    return (
        <section className="workspace-card">

            <div className="workspace-card-header">

                <h2>
                    Members
                </h2>

                <span>
                    {members.length} members
                </span>

            </div>

            <div className="member-list">
                {members.map((member) => {

                    const profile =
                        member.profiles;

                    const avatar =
                        profile?.avatar_url;

                    const initials =
                        (
                            profile?.full_name ??
                            profile?.username ??
                            "?"
                        )
                            .charAt(0)
                            .toUpperCase();

                    return (

                        <div
                            key={profile.id}
                            className="member-row"
                        >

                            <div className="member-left">

                                {avatar ? (

                                    <img
                                        src={avatar}
                                        className="member-avatar"
                                    />

                                ) : (

                                    <div className="member-avatar initials">
                                        {initials}
                                    </div>

                                )}

                                <div>

                                    <div className="member-name">

                                        {profile.full_name ??
                                            profile.username}

                                        {member.role ===
                                            "owner" && (
                                                <Crown
                                                    size={
                                                        15
                                                    }
                                                />
                                            )}

                                    </div>

                                    <span className="member-username">
                                        {profile.username}
                                    </span>

                                </div>

                            </div>

                            {isOwner &&
                                member.role !==
                                "owner" ? (

                                <div className="member-actions">

                                    <Select
                                        value={
                                            member.role
                                        }
                                        onValueChange={(
                                            value
                                        ) =>
                                            changeRole(
                                                profile.id,
                                                value
                                            )
                                        }
                                    >

                                        <SelectTrigger className="role-select">

                                            <SelectValue />

                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>

                                            <SelectItem value="member">
                                                Member
                                            </SelectItem>

                                        </SelectContent>

                                    </Select>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            remove(
                                                profile.id
                                            )
                                        }
                                    >

                                        <Trash2
                                            size={
                                                16
                                            }
                                        />

                                    </Button>

                                </div>

                            ) : (

                                <span className="role-pill">
                                    {member.role}
                                </span>

                            )}

                        </div>

                    );

                })}

            </div>

        </section>
    );
}

export default MemberList;