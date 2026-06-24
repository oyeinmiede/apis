import { supabase } from "@/services/supabase/client";

export async function createWorkspace({
    name,
    ownerId,
}) {
    return await supabase
        .from("workspaces")
        .insert({
            name,
            owner_id: ownerId,
        })
        .select()
        .single();
}

export async function addWorkspaceMember({
    workspaceId,
    userId,
    role = "owner",
}) {
    return await supabase
        .from("workspace_members")
        .insert({
            workspace_id: workspaceId,
            user_id: userId,
            role,
        });
}