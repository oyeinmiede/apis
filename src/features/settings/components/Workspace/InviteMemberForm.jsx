import { useState } from "react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import {
    addWorkspaceMember,
} from "@/features/workspace/services/workspaces";

import "./styles/workspace-settings.css";

function InviteMemberForm({
    workspace,
    currentUser,
    editable,
    onInvite,
}) {
    const [email, setEmail] =
        useState("");

    const [role, setRole] =
        useState("member");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    if (!workspace || !editable)
        return null;

    async function invite(){
        if(!email)return;
    
        setLoading(true);
        setError("");
    
        const result=await addWorkspaceMember(
            workspace.id,
            email,
            role,
            currentUser.id
        );
    
        if(result.error){
            setError(result.error.message);
            setLoading(false);
            return;
        }
    
        await onInvite();
    
        setEmail("");
        setRole("member");
        setLoading(false);
    }

    return (
        <section className="workspace-card">

            <div className="workspace-card-header">

                <h2>
                    Invite Member
                </h2>

                <span>
                    Add someone to this workspace
                </span>

            </div>

            <Input
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <Select
                value={role}
                onValueChange={
                    setRole
                }
            >

                <SelectTrigger>

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="member">
                        Member
                    </SelectItem>

                    <SelectItem value="admin">
                        Admin
                    </SelectItem>

                </SelectContent>

            </Select>

            {error && (
                <p className="workspace-error">
                    {error}
                </p>
            )}

            <Button
                disabled={loading}
                onClick={invite}
            >
                {loading
                    ? "Adding..."
                    : "Add Member"}
            </Button>

        </section>
    );
}
export default InviteMemberForm;